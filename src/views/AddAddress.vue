<script setup>
import { ref, watch, onMounted, reactive, watchEffect } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

const addressData = ref({
  country: '',
  province: '',
  district: '',
  city: '',
  completeAddress: '',
  lat: '',
  lng: ''
})

const map = ref({
  key: 'Your google maps API key here',
  language: 'us-EN',
  region: 'US',
  center: {
    lat: 31.463487387425936,
    lng: 1514.2475834252712
  },
  zoom: 12,
  minZoom: 2,
  maxZoom: null,
  streetViewControl: false
})

let gmap = ref(null)
const mapRef = ref(null)
const autocompleteRef = ref(null)
const markerOptions = reactive({
  position: map.value.center
})

watch(
  () => mapRef.value?.ready,
  (ready) => {
    if (ready) {
      gmap.value = mapRef.value.map
    }
  }
)

function placeChanged() {
  const place = autocomplete.getPlace()
  if (place && place.geometry) {
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()
    map.value.center = { lat, lng }
    map.value.zoom = 15

    addressData.value.lat = lat
    addressData.value.lng = lng
    addressData.value.completeAddress = place?.address_components[0]?.long_name
    addressData.value.district =
      place?.address_components[place?.address_components?.length - 3]?.long_name
    addressData.value.city =
      place?.address_components[place?.address_components?.length - 4]?.long_name
    addressData.value.province =
      place?.address_components[place?.address_components?.length - 2]?.long_name
    addressData.value.country =
      place?.address_components[place?.address_components?.length - 1]?.long_name
  }
}
let autocomplete = null

onMounted(() => {
  autocomplete = new google.maps.places.Autocomplete(autocompleteRef.value, {
    types: ['geocode']
  })
  autocomplete.addListener('place_changed', placeChanged)
})

watchEffect(() => {
  const { lat, lng } = markerOptions.position
  markerOptions.position = { lat, lng }
})
const inputStyle =
  'w-full resize-none font-normal text-base text-black rounded py-3 px-4 bg-[#F4F5FA] border-none placeholder:text-black placeholder:text-opacity-60 focus:outline-none'
</script>

<template>
  <section class="bg-white lg:px-12 px-5 py-5 rounded-lg relative min-h-screen">
    <h1 class="font-bold text-4xl text-center mb-12">Vue Google Map</h1>
    <div class="grid lg:grid-cols-2 gap-x-2 xl:gap-x-20">
      <div class="lg:w-4/5 h-fit grid lg:grid-cols-2 gap-5 lg:order-1 order-2">
        <div class="col-span-1 lg:col-span-2">
          <input
            v-model="addressData.completeAddress"
            type="text"
            name="address"
            :class="inputStyle"
            placeholder="Street Address"
          />
        </div>
        <div>
          <input
            v-model="addressData.district"
            type="text"
            name="district"
            :class="inputStyle"
            placeholder="District"
          />
        </div>
        <div>
          <input
            v-model="addressData.city"
            type="text"
            name="city"
            :class="inputStyle"
            placeholder="City"
          />
        </div>
        <div class="lg:col-span-2">
          <input
            v-model="addressData.province"
            type="text"
            name="province"
            :class="inputStyle"
            placeholder="Province"
          />
        </div>
        <div class="lg:col-span-2">
          <input
            v-model="addressData.country"
            type="text"
            name="country"
            :class="inputStyle"
            placeholder="Country"
          />
        </div>
        <div>
          <input
            v-model="addressData.lat"
            type="text"
            name="lat"
            :class="inputStyle"
            placeholder="Latitude"
            :readonly="true"
          />
        </div>
        <div>
          <input
            v-model="addressData.lng"
            type="text"
            name="lng"
            :class="inputStyle"
            placeholder="Longitude"
            :readonly="true"
          />
        </div>
      </div>
      <div class="space-y-5 lg:order-2 order-1">
        <div>
          <input
            ref="autocompleteRef"
            type="text"
            :class="inputStyle"
            placeholder="Search for an address"
            @keydown.enter.prevent
          />
        </div>
        <GoogleMap
          id="map"
          ref="mapRef"
          :api-key="map.key"
          :language="map.language"
          :region="map.region"
          :center="map.center"
          :zoom="map.zoom"
          :min-zoom="map.minZoom"
          :max-zoom="map.maxZoom"
          :street-view-control="map.streetViewControl"
          class="w-full h-80"
        >
          <Marker :options="{ position: map.center }" />
        </GoogleMap>
      </div>
    </div>
  </section>
</template>

<template>
  <CardTemplate>
    <template v-slot:icon>
      <i
        class="la la-home text-primary-800 p-4 text-2xl bg-primary-200 rounded-full"
      ></i>
    </template>
    <template v-slot:heading>
      House Details
    </template>
    <template v-slot:action>
      <i
        class="las la-angle-up text-gray-800 text-2xl p-4 hover:bg-gray-200 transition rounded-full relative"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleCollapse"
      >
      </i>
    </template>
    <template v-slot:content>
      <transition name="collapse" mode="in-out">
        <div v-if="!collapsed">
          <div class="house-preview mb-4">
            <img
              v-if="value.decade"
              :src="`/static/${buildingPreview}`"
              alt
              class="w-full h-48 rounded-lg object-cover"
            />
            <img
              v-else
              alt=""
              src=""
              class="w-full h-48 rounded-lg object-cover bg-gray-200"
            />
          </div>
          <div>
            <Dropdown
              v-model.number="value.decade"
              :label="'Decade'"
              :items="decades"
              :name="'decade'"
              :get="'decade'"
              :required="true"
              :display="'decade'"
            />
            <TextInput
              v-model.number="value.levels"
              :label="'Number of Floors (Including Basement)'"
              :placeholder="'2'"
              :type="'number'"
              :required="true"
              :variant="'primary'"
              :name="'levels'"
            />
            <Dropdown
              v-model.number="value.LocationsId"
              :label="'Locations'"
              :items="locations"
              :name="'location'"
              :required="true"
              :get="'id'"
              :display="'country'"
            />
            <Dropdown
              v-model.number="value.HeatingSystemsId"
              :label="'Heating System Type'"
              :items="heatingSystems"
              :name="'heatingSystem'"
              :required="true"
              :get="'id'"
              :display="'type'"
            />
            <TextInput
              v-model.number="value.heating_per_year"
              :label="'Heating Cost/Year [EUR]'"
              :placeholder="'1400'"
              :type="'number'"
              :required="true"
              :variant="'primary'"
              :name="'heatingCost'"
            />
            <Checkbox
              v-model="value.warm_water_pipe"
              :label="'Warm Water Pipe'"
              :required="true"
              class="py-2"
            />
          </div>
        </div>
      </transition>
    </template>
  </CardTemplate>
</template>

<script>
import { mapActions } from 'vuex'
import CardTemplate from './CardTemplate'
import TextInput from '~/components/Common/InputText'
import Dropdown from '~/components/Common/Dropdown'
import Checkbox from '~/components/Common/Checkbox'

export default {
  components: {
    CardTemplate,
    TextInput,
    Dropdown,
    Checkbox
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collapsed: false,
      loading: true,
      decades: [],
      locations: [],
      heatingSystems: []
    }
  },
  computed: {
    buildingPreview() {
      const val = this.value
      const preview = this.decades.find(function(decade) {
        return decade.decade === val.decade
      })
      return preview.houseImage
    }
  },
  mounted() {
    this.getInitialData()
  },
  methods: {
    ...mapActions(['GET_LOCATIONS', 'GET_HEATING_SYSTEMS', 'GET_DEFAULTS']),
    async getInitialData() {
      try {
        const decades = await this.GET_DEFAULTS()
        const locations = await this.GET_LOCATIONS()
        const heatingSystems = await this.GET_HEATING_SYSTEMS()
        this.decades = decades
        this.locations = locations
        this.heatingSystems = heatingSystems
      } catch (err) {
        console.log(err)
      }
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="postcss" scoped>
.circle {
  min-width: 2em;
  min-height: 2em;
  @apply w-8 h-8;
}

.rotate-180 {
  transform: rotate(180deg);
}

.collapse-enter-active,
.collapse-leave-active {
  max-height: 800px;
  transition: all 0.6s ease-in-out;
}
.collapse-enter,
.collapse-leave-to {
  max-height: 0;
  @apply overflow-hidden opacity-0;
}
</style>

<template>
  <div class="tile" :class="getClass()" @click.left="leftClick" @click.right.prevent="rightClick">
  </div>
</template>

<script setup>
import {ref, unref} from "vue";

const props = defineProps({
  x: {
		type: Number,
    required: true
  },
  y: {
		type: Number,
    required: true
  },
	correct: {
		type: Number,
		required: true
	},
})
const val = ref(0);

const emit = defineEmits(['update'])
const getClass = () => {
	if (val.value === 1) {
		return "tile__filled"
  } else if (val.value === 0) {
		return "tile__empty"
  } else if (val.value === 2) {
		return "tile__checked"
  }
}

const leftClick = () => {
	if (val.value === 1) {
		val.value = 0
	} else if (val.value === 0) {
		val.value = 1
	} else val.value = 1
	emit('update', props.x, props.y, unref(val))
}

const rightClick = () => {
	if (val.value === 2) {
		val.value = 0
	} else {
		val.value = 2
	}
	emit('clicked', props.id, val)
}
</script>

<style lang="scss" scoped>
.tile {
  height: 30px;
  width: 30px;
  border: 1px solid #222222;

  &:hover {
    cursor: pointer;
  }

  &__empty {
    background-color: white;
  }

  &__checked {
    position: relative;
    color: #333333;

    &:after {
      position: absolute;
      top: -1px;
      bottom: 0;
      left: -4px;
      right: 0;
      content: "\D7";
      color: #333333;
      font-size: 30px;
      line-height: 30px;
    }
  }

  &__filled {
    background-color: #333333;
  }

}
</style>

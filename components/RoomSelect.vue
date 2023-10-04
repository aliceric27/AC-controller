<template>
  <div class="sticky flex justify-center w-full top-14">
    <select
      class="max-w-[17.5rem] w-full p-2 my-2 bg-[#cccccc] rounded-lg text-2xl font-bold bg-opacity-90"
      v-model="selectedroom"
      @change="handleChange"
    >
      <option value="1">{{ $t("pickroom") }}</option>
      <option v-for="val in roomlist()" :value="val">
        {{ `${val}房` }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["change"]);
const handleChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emit("change", Number(value)); // assuming the value is a number
};
// tmp fake data
const selectedroom = ref(1);
const roomlist = () => {
  let result = [];
  for (let i = 0; i < 30; i++) {
    result.push(i);
  }
  return result;
};
</script>

<style scoped></style>

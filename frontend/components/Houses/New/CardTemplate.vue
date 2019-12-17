<template>
  <div class="card shadow-lg rounded-lg bg-white flex flex-row p-3 mb-4">
    <div class="flex flex-shrink flex-col">
      <slot name="icon" />
    </div>
    <div class="flex flex-grow flex-col pl-3">
      <div class="heading flex flex-row justify-between items-center">
        <h4 class="w-auto">
          <slot name="heading" />
        </h4>
        <slot name="action" />
      </div>
      <div class="content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

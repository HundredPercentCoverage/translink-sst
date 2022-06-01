<script lang="ts">
  export let service: Service;
  let isOpen = false;
</script>

<div class="border-4 border-white rounded-xl p-4 bg-green-600 text-white shadow-md">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <h2 class="text-lg w-64">{service.Destination1.$.name}</h2>
      <div class="w-16">
        <p class="text-sm">Arr:</p>
        {service.Destination1.$.etarr}
      </div>
      <div class="w-16">
        <p class="text-sm">Dep:</p>
        {service.DepartTime.$.time}
      </div>
      <div class="w-16">
        <p class="text-sm">Status:</p>
        {service.ServiceStatus.$.Status}
      </div>
    </div>
    <button
      on:click={() => isOpen = !isOpen}
      class="hover:underline"
      type="button"
    >
      {isOpen ? 'Hide stops' : 'Show stops'}
    </button>
  </div>
  {#if isOpen}
    <div class="border-t-2 border-white mt-2 pt-2">
      {#if service.Dest1CallingPoints.CallingPoint && service.Dest1CallingPoints.CallingPoint.length > 0}
        {#each service.Dest1CallingPoints.CallingPoint as callingPoint}
          <p><span class="w-12 inline-block">{callingPoint.$.etarr}</span>{callingPoint.$.Name}</p>
        {/each}
      {:else}
        <p>No further stops</p>
      {/if}
    </div>
  {/if}
</div>

<style>

</style>

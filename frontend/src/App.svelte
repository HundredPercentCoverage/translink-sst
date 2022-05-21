<script lang="ts">
  import Service from "./lib/Service.svelte";

  let selectedStationCode: string;
  let stationTimetable: StationTimetable;
  let loadingTimetable = false;

  async function getRequest<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json() as Promise<T>;
  }

  async function handleSubmit() {
    loadingTimetable = true;
    stationTimetable = await getRequest<StationTimetable>(`${import.meta.env.VITE_API_URL}/station/${selectedStationCode}`);
    console.log(stationTimetable);
    loadingTimetable = false;
  }

  const stationsPromise = getRequest<StationsResponse>(`${import.meta.env.VITE_API_URL}/stations`);
</script>

<div class="max-w-screen-xl mx-auto px-3 flex w-full items-center justify-start py-4">
  <h1 class="text-5xl font-bold">Translink Trains</h1>
</div>
<main class="max-w-screen-xl mx-auto px-3 min-h-screen">
  <p>Give the upcoming departures for...</p>
  <select bind:value={selectedStationCode} id="station">
    {#await stationsPromise}
      <option>Loading stations...</option>
    {:then stations}
      <option value="" default disabled selected>Choose</option>
      {#each stations.stations as station}
        <option value={station.code}>{station.name}</option>
      {/each}
    {:catch error}
      <option>{error.message}</option>
    {/await}
  </select>
  <button
    on:click={handleSubmit}
    type="button"
    class="bg-yellow-400 px-3 py-1 font-bold rounded-md border-2 border-black mb-4"
  >
    Load
  </button>
  <div class="flex flex-col space-y-2">
    {#if stationTimetable && !loadingTimetable}
      {#if stationTimetable.StationBoard.Service}
        {#if Array.isArray(stationTimetable.StationBoard.Service)}
          {#each stationTimetable.StationBoard.Service as service}
            <Service service={service} />
          {/each}
        {:else}
          <Service service={stationTimetable.StationBoard.Service} />
        {/if}
      {:else}
        <p>No trains</p>
      {/if}
    {/if}
    {#if loadingTimetable}
      <p>Loading timetable...</p>
    {/if}
  </div>
</main>

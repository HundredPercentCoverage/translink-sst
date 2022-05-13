<script lang="ts">
  interface Station {
    code: string;
    name: string;
    shortCode: string;
  }

  interface StationsResponse {
    stations: Station[]
  }

  let selectedStationCode: string;
  let stationTimetable: any;

  async function getRequest<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json() as Promise<T>;
  }

  async function handleSubmit() {
    // This needs typed
    stationTimetable = await getRequest(`${import.meta.env.VITE_API_URL}/station/${selectedStationCode}`);
  }

  const stationsPromise = getRequest<StationsResponse>(`${import.meta.env.VITE_API_URL}/stations`);

</script>

<div class="flex w-full items-center justify-center bg-gray-800 italic">
  <h1 class="text-2xl text-white">Potato</h1>
</div>
<main>
  <p>Give me stuff for...</p>
  {#await stationsPromise}
    <p>Loading stations...</p>
  {:then stations}
    <select bind:value={selectedStationCode} id="station">
      {#each stations.stations as station }
        <option value={station.code}>{station.name}</option>
      {/each}
    </select>
  {:catch error}
    <p>{error.message}</p>
  {/await}
  <p>Selected station: { selectedStationCode || 'nothing' }</p>
  <button on:click={handleSubmit}>Gimmie</button>
  {stationTimetable}
</main>

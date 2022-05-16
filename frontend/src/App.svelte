<script lang="ts">
  interface Station {
    code: string;
    name: string;
    shortCode: string;
  }

  interface StationsResponse {
    stations: Station[]
  }

  interface Destination {
    $: {
      etarr: string;
      name: string;
      ttarr: string;
    }
  }

  interface CallingPoint {
    $: {
      Name: string;
      etarr: string;
      etdep: string;
      ttarr: string;
      ttdep: string;
    }
  }

  interface Service {
    DepartTime: { $: { time: string } };
    ServiceStatus: { $: { Status: string } };
    Dest1CallingPoints: {
      CallingPoint: CallingPoint[];
    }
    Destination1: Destination;
  }

  interface StationTimetable {
    StationBoard: {
      Service: Service[] | Service;
    };
  }

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

<div class="max-w-screen-xl mx-auto flex w-full items-center justify-start py-4">
  <h1 class="text-5xl font-bold">Translink Trains</h1>
</div>
<main class="max-w-screen-xl mx-auto">
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
    class="bg-yellow-400 px-3 py-1 font-bold rounded-md border-2 border-black"
  >
    Load
  </button>
  {#if stationTimetable && !loadingTimetable}
    {#if stationTimetable.StationBoard.Service}
      {#if Array.isArray(stationTimetable.StationBoard.Service)}
        {#each stationTimetable.StationBoard.Service as service}
          <p>{service.Destination1.$.name}</p>
        {/each}
      {:else}
        <p>{stationTimetable.StationBoard.Service.Destination1.$.name}</p>
      {/if}
    {:else}
      <p>No trains</p>
    {/if}
  {/if}
  {#if loadingTimetable}
    <p>Loading timetable...</p>
  {/if}
</main>

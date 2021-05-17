<script context="module">
  export function preload() {
    return this.fetch(`/index.json`)
      .then((r) => r.json())
      .then((images) => {
        return { images };
      });
  }
</script>

<script>
  export let images;
  let preview, fileinput;

  const onFileSelected = (e) => {
    let image = e.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      preview = e.target.result;
    };
  };

  const uploadImage = () => {
    uploadImageToCloudinary(preview);
  };

  const uploadImageToCloudinary = async (imageDataUrl) => {
    const res = await fetch("/index.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageDataUrl }),
    });
    const json = await res.json();
    if (json.imageUrl) {
      window.location.reload();
    }
  };
</script>

<svelte:head>
  <title>Sapper Cloudinary Upload</title>
</svelte:head>

<div class="app">
  <h2>Upload Image</h2>
  <div
    class="dropzone"
    on:click={() => {
      fileinput.click();
    }}
    on:drop={(e) => {
      e.preventDefault();
      onFileSelected(e.dataTransfer);
    }}
    on:dragenter={(e) => {
      e.preventDefault();
    }}
    on:dragleave={(e) => {
      e.preventDefault();
    }}
    on:dragover={(e) => {
      e.preventDefault();
    }}
  >
    {#if preview}
      <img class="preview" src={preview} alt="preview" />
    {/if}

    <img
      class="upload-icon"
      src="https://static.thenounproject.com/png/625182-200.png"
      alt=""
      on:click={() => {
        fileinput.click();
      }}
    />
    <input
      style="display:none"
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e.target)}
      bind:this={fileinput}
    />
    {#if !preview}
      <div
        class="chan"
        on:click={() => {
          fileinput.click();
        }}
      >
        Drag N Drop Images or Click on Upload.
      </div>
    {/if}
  </div>
  {#if preview}
    <button
      on:click={() => {
        uploadImage();
      }}>Upload Image</button
    >
  {/if}
</div>

<h2>Sapper Image Gallery</h2>
<div class="container">
  {#each images as image (image.secureUrl)}
    <section class="image">
      <img src={image.secureUrl} alt={image.secureUrl} width="400px" />
    </section>
  {/each}
</div>

<style>
  

  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    margin: 1em;
  }
  .dropzone {
    height: fit-content;
    max-width: 600px;
    background: #fdfdfd;
    border-radius: 5px;
    border: 2px dashed #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 5rem;
  }
  .upload-icon {
    display: flex;
    height: 50px;
    width: 50px;
    cursor: pointer;
  }

  .preview {
    display: flex;
    height: 50%;
    width: 50%;
  }
  button {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    border-radius: 25px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 1em;
    cursor: pointer;
  }

  h2 {
    font-size: 2.4em;
    text-decoration: underline;
    font-weight: 400;
    margin: 0 0 0.5em 0;
    text-align: center;
  }
  .container {
    column-count: 3;
    column-gap: 20px;
  }
  section > img {
    flex: 100%;
    max-width: 100%;
    margin-top: 1rem;
    border-radius: 10px;
  }
  .image {
    margin-bottom: 1rem;
    display: flex;
  }

  @media only screen and (max-width: 600px) {
    .container {
      column-count: 1;
    }
  }
</style>

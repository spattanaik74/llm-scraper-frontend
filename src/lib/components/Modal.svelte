<!-- <script>
    let showModal = false;
  
    let modalContent = {
      title: "Modal Title",
      experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...", // Long text for scrollable experience
      link: "https://example.com",
    };
  
    function openModal() {
      showModal = true;
    }
  
    function closeModal() {
      showModal = false;
    }
  
    function handleOverlayClick(event) {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    }
  </script>
  
  <style>
    .modal {
    display: { showModal ? 'flex' : 'none' };
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);

    }
    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      width: 300px;
      max-width: 80%;
    }
  
    .experience {
      max-height: 200px;
      overflow-y: auto;
    }
  </style>
  
  <button on:click={openModal}>Open Modal</button>
  
  {#if isOpen}
  <div class="modal" on:click={handleOverlayClick}>
    <div class="modal-content">
      <h2>{content.title}</h2>
      <div class="experience">
        <p>{content.experience}</p>
      </div>
      <p><a href={content.link} target="_blank">Learn more</a></p>
      <button on:click={closeModal}>Close</button>
    </div>
  </div>
{/if} -->
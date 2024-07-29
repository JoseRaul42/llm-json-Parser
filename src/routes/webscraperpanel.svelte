<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Store declarations
    let inputText: string = '';
    let responseText: string = '';
    const isLoading = writable<boolean>(false);
  
    // Async function to interact with the server
    async function interactWithLLM(): Promise<void> {
      isLoading.set(true);
      responseText = '';
      try {
        const response = await fetch('/api/webscraper', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: inputText }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        responseText = JSON.stringify(data, null, 2) ?? 'No response from web scraper';
      } catch (error: any) {
        responseText = `Error: ${error.message || 'An unknown error occurred'}`;
      } finally {
        isLoading.set(false);
      }
    }
  </script>
  
  <style>
    .playground {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-style: italic;
      text-align: center;
      border: 1px solid #1abc9c;
      border-radius: 8px;
      background-color: #1abc9c;
    }
  
    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
  
    button {
      padding: 10px 20px;
      margin-top: 10px;
      border: none;
      border-radius: 4px;
      background-color: #041221;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    button:disabled {
      background-color: #6c757d;
    }
  
    button:not(:disabled):hover {
      background-color: #0056b3;
    }
  
    .response {
      margin-top: 20px;
      white-space: pre-wrap;
      padding: 10px;
      background-color: #e9ecef;
      border-radius: 4px;
      border: 1px solid #ced4da;
    }
  
    .loading {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
  
  <div class="playground">
    <h3>Enter Any URL you want to convert into LLM friendly JSON format</h3>
    <textarea bind:value={inputText} placeholder="Enter your text here..."></textarea>
    <button on:click={interactWithLLM} disabled={$isLoading}>
      {#if $isLoading}
        <span class="loading"></span> Loading...
      {/if}
      {#if !$isLoading}
        Submit
      {/if}
    </button>
    <div class="response">{responseText}</div>
  </div>
  
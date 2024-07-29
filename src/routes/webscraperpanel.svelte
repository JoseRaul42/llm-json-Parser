<script lang="ts">
  import { writable } from 'svelte/store';

  let inputText: string = '';
  let responseText: string = '';
  const isLoading = writable<boolean>(false);
  const copySuccess = writable<string>('');

  async function interactWithLLM(): Promise<void> {
    isLoading.set(true);
    responseText = '';
    copySuccess.set('');
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

  function copyToClipboard() {
    navigator.clipboard.writeText(responseText).then(() => {
      copySuccess.set('Copied to clipboard!');
      setTimeout(() => copySuccess.set(''), 2000); // Clear success message after 2 seconds
    }).catch(err => {
      copySuccess.set('Failed to copy!');
    });
  }
</script>

<style>
  .playground {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-style: italic;
    text-align: center;
    border: 1px solid #98b300;
    border-radius: 8px;
    background-color:#001f3f;
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
    border:1px solid #98b300;
    border-radius: 4px;
    background-color:#0900b3;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:disabled {
    background-color: #6c757d;
  }

  button:not(:disabled):hover {
    background-color: #0903b0;
  }

  .response {
    margin-top: 20px;
    max-height: 300px;
    overflow: auto;
    white-space: pre-wrap;
    padding: 10px;
    background-color: #2f5172a4;
    border-radius: 4px;
    border: 1px solid #ced4da;
    position: relative; /* Ensure positioning for copy button */
  }

  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #0900b3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .copy-button:hover {
    background-color: #004494;
  }

  .copy-success {
    margin-top: 10px;
    font-size: 0.9rem;
    color: rgb(0, 0, 0);
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
  <h3>Enter any URL to convert into LLM-friendly JSON.</h3>
  <textarea bind:value={inputText} placeholder="https://example.com/"></textarea>
  <button on:click={interactWithLLM} disabled={$isLoading}>
    {#if $isLoading}
      <span class="loading"></span> Loading...
    {/if}
    {#if !$isLoading}
      Submit
    {/if}
  </button>
  <div class="response">
    <button class="copy-button" on:click={copyToClipboard}>Copy</button>
    {responseText}
  </div>
  {#if $copySuccess}
    <div class="copy-success">{$copySuccess}</div>
  {/if}
</div>

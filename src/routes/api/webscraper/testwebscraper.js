import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Dynamically import the server module
const serverModule = await import('./+server.js');

async function testScrape() {
    const testUrl = 'https://example.com'; // Replace with the URL you want to test

    try {
        // Simulate the POST request data structure
        const mockRequest = {
            json: async () => ({ url: testUrl }),
        };

        // Call the POST function and handle the response
        const response = await serverModule.POST({ request: mockRequest });
        console.log('Scraping result:', await response.json());
    } catch (error) {
        console.error('Error during test scraping:', error);
    }
}

testScrape();

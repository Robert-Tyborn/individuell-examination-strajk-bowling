
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock POST request to submit reservation
  http.post('https://example.com/user', (req, res, ctx) => {
    // Sample confirmation details to return in the response
    const confirmationDetails = {
      active: true,
      when: '2024-05-29T20:30',
      people: '4',
      lanes: '2',
      id: 'ABC123',
      price: 680,
    };

    // Return the confirmation details as part of the response
    return res(
      ctx.json({
        confirmationDetails,
        // Add any other data needed in the response
      })
    );
  }),
];
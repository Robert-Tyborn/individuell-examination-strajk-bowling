import { http, HttpResponse } from "msw";

const mockBookingDetails = {
  when: "2024-05-29T20:30",
  lanes: "1",
  people: "2",
  shoes: ["42", "43"],
  price: 340,
  id: "Rob666",
  active: true,
};

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/",
    () => {
      return HttpResponse.json(mockBookingDetails, { status: 201 });
    }
  ),
];
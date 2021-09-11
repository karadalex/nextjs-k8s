import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m30s', target: 2000 },
    { duration: '1m', target: 10 },
  ],
};

export default function () {
  http.get('http://localhost:3000');
  sleep(1);
}

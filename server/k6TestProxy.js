import k6http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "20s", target: 100 },
    { duration: "30s", target: 200 },
    { duration: "30s", target: 500 },
    { duration: "10s", target: 0 }
  ]
};

export default function() {
  var url = `http://localhost:3000/?id=${Math.ceil(Math.random() * 9999999)}`;
  k6http.get(url);
  sleep(1);
};

1) logs:
docker compose up --build 
time="2026-07-05T22:07:03+03:00" level=warning msg="The \"A1bC9dEfGh\" variable is not set. Defaulting to a blank string."
time="2026-07-05T22:07:03+03:00" level=warning msg="The \"A1bC9dEfGh\" variable is not set. Defaulting to a blank string."
time="2026-07-05T22:07:03+03:00" level=warning msg="The \"A1bC9dEfGh\" variable is not set. Defaulting to a blank string."
time="2026-07-05T22:07:03+03:00" level=warning msg="The \"A1bC9dEfGh\" variable is not set. Defaulting to a blank string."

#7 [deps 1/4] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
#7 resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 0.0s done
#7 DONE 0.1s

#8 [deps 2/4] WORKDIR /app
#8 CACHED

#9 [deps 3/4] COPY package*.json ./
#9 CACHED

#10 [deps 4/4] RUN npm ci --omit=dev && npm cache clean --force
#10 CACHED

#11 [production 3/4] COPY --from=deps /app/node_modules ./node_modules
#11 CACHED

#12 [production 4/4] COPY . .
#12 DONE 0.0s

#13 exporting to image
#13 exporting layers
#13 exporting layers 0.2s done
#13 exporting manifest sha256:669128242b65ca3cdcddcfb2f7856886304625f69b2f635c19464a27eb2d4e87 0.0s done
#13 exporting config sha256:2a7e308a93e6c7a9274b9fe92d5edf00bb199de4f4e20c77986098b4cd5d94fd 0.0s done
#13 exporting attestation manifest sha256:5b50f24519bf24ac1ec1f9674dde66546f400ea4def55ca44a09dfffe3f7846f 0.0s done
#13 exporting manifest list sha256:b6cffd163ffa61b9e976a56c28ef04aebf9abdb84151045d7c16028cfaa82ce7
#13 exporting manifest list sha256:b6cffd163ffa61b9e976a56c28ef04aebf9abdb84151045d7c16028cfaa82ce7 0.0s done
#13 naming to docker.io/library/user-manegment-app:latest done
#13 unpacking to docker.io/library/user-manegment-app:latest 0.1s done
#13 DONE 0.4s

#14 resolving provenance for metadata file
#14 DONE 0.0s
[+] up 2/2
 ✔ Image user-manegment-app       Built                                                                                                 2.8s
 ✔ Container user-manegment-app-1 Recreated                                                                                             0.4s
Attaching to app-1, mongo-1
Container user-manegment-mongo-1 Waiting 
Container user-manegment-mongo-1 Healthy 
app-1    | ◇ injected env (0) from .env // tip: ⌘ enable debugging { debug: true }
app-1    | Attempting to connect to MongoDB...
app-1    | DB_USER: ✓ Set
app-1    | DB_PASSWORD: ✓ Set
app-1    | welcome to my DB, have fun!!!!
app-1    | app is running on port!!!!!!!!!!!!!!!!!!!!!!! 3000 🤖
app-1    | mongodb connected successfully!! 🎉🎉🎉🎉🎉

2)
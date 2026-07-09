---
title: "SMDrop: smart irrigation"
kind: "Side project · RL"
summary: "An adaptive irrigation system framed as a reinforcement-learning problem, built to pitch at SpinUOC. IoT data pipeline, a physics-based simulator as the environment, and reward logging. Currently frozen."
thumb: "/work/smdrop.jpg"
thumbAlt: "Infographic of the SMDrop pipeline: sensor data collected on a Raspberry Pi hub, cleaned and stored in a database, and AI-driven decisions feeding a smart sprinkler, with a weather API in the loop."
status: "Frozen"
order: 5
draft: false
---

SMDrop is a smart-irrigation project I built to present at **SpinUOC** (the UOC's
entrepreneurship showcase). The idea: treat irrigation as a control problem and
let a **reinforcement-learning** agent decide when and how much to water, instead
of relying on fixed schedules.

## How it's set up

I framed watering as an RL problem (state, action, reward, next state) and
built the pieces around it:

- **A physics-based simulator as the environment.** Soil water balance driven by
  Hargreaves evapotranspiration, so an agent can be trained and evaluated
  against a realistic dynamic without touching a real field.
- **An IoT data pipeline.** Sensor data validated at the boundary and written to
  **InfluxDB**, with **Grafana** dashboards on top, the same shape real sensors
  would feed into.
- **Real weather.** An Open-Meteo client pulls actual meteorological data into
  the loop.
- **A rule engine with interchangeable baseline policies.** Three hand-written
  policies to benchmark against, so any learned policy has something honest to
  beat.
- **RL logging.** Transitions logged as `(s, a, r, s')` tuples with a defined
  reward, exportable for training.

It's built cleanly: a `src/` library, unit tests that don't need Docker, a
formal data contract between sensor and software, and a Docker-composed stack.

## Status

The project is **frozen**: the RL-oriented scaffolding (environment, pipeline,
reward, baselines) is in place, but a trained agent is future work; the pitch
and the MVP came first, and my thesis took priority. It's here because it shows
how I think about reinforcement learning in practice: formulate the problem,
build a trustworthy environment and baselines, and instrument everything before
reaching for a fancier model.

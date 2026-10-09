---
title: "SMDrop: smart irrigation"
kind: "Side project · RL"
summary: "Adaptive irrigation as a reinforcement-learning problem: an IoT pipeline, a physics-based simulator as the environment, and reward logging."
thumb: "/work/smdrop.jpg"
thumbAlt: "Infographic of the SMDrop pipeline: sensor data collected on a Raspberry Pi hub, cleaned and stored in a database, and AI-driven decisions feeding a smart sprinkler, with a weather API in the loop."
status: "Frozen"
order: 7
theme: "lab"
draft: false
page:
  metaTitle: "SMDrop, smart irrigation · Marc Recio"
  metaDescription: "Irrigation as a reinforcement-learning problem: a simulator for its environment, an IoT pipeline, and baselines to beat."
  label: "More work · side project"
  headline: "SMDrop, <span class=\"accent-word\">smart irrigation</span>."
  lead: "Irrigation as a reinforcement-learning problem: a simulator for its environment, an IoT pipeline, and baselines to beat."
  chips: "<span class=\"chip\" style=\"--tone:var(--a-sage)\">Frozen</span><span class=\"tag\">SpinUOC</span>"
  shot:
    src: "/work/smdrop.jpg"
    alt: "Infographic of the SMDrop pipeline: sensor data on a Raspberry Pi hub, cleaned and stored, and decisions feeding a smart sprinkler, a weather API in the loop"
    caption: "SMDrop's pipeline, from the sensors to the sprinkler."
  blocks:
    - heading: "What it is"
      html: "<p>A smart-irrigation project our team of three took to SpinUOC, the UOC's entrepreneurship showcase; I led its AI and its data. A policy decides when and how much to water, instead of a fixed schedule: rules in its first version, an agent trained by reinforcement learning as the next step.</p>"
    - heading: "How"
      html: "<ul><li>A simulator for the environment: the soil's water balance, driven by Hargreaves evapotranspiration.</li><li>Sensor data validated at the boundary, into InfluxDB, with Grafana on top; real weather from Open-Meteo.</li><li>Three baseline policies, and every transition logged as (s, a, r, s′).</li></ul>"
    - heading: "What came out"
      html: "<p>The rules met the first version's goal on a 30-day summer simulation in Valencia: the soil in its optimal range the whole time and 0&nbsp;mm drained, where a fixed schedule used more water and drained 11&nbsp;mm. Then frozen: a trained agent is future work; my thesis came first.</p>"
  stack: ["Python", "InfluxDB", "Grafana", "Docker"]
  actions:
    - href: "/work/"
      label: "All the work"
      dark: true
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

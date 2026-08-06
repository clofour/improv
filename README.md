# improv

Improv is a permafrost-themed Hack Club YSWS centered around building tools to deploy software automatically in order to receive infrastructure-related prizes and discounts. This repository contains the website for Improv, built on NextJS.

For further information about the YSWS, see the [/#summary](Knowledge Base), [https://hackclub.enterprise.slack.com/archives/C0BEVTSE0BD](the Slack channel) and [https://hackclub.enterprise.slack.com/docs/T0266FRGM/F0BL5FG724C](the in-depth explanation canvas).

## Quick Start

To run the website for development, use `npm run dev`. To build the website, use `npm run build`.

## Knowledge Base

### Summary

**YS**: Build tools that deploy software automatically such as container orchestrators, image builders, CI/CD pipelines, Kubernetes operators, PaaS, game hosting services... If you're just getting started, you can also use existing tools such as Terraform or Ansible to get a feel for provisioning.

**WS**: The reward is two-fold:
* Earn Uptime, which you can spend on rewards such as hosting/domain credits, CPU/GPU grants, Minecraft, cool merch ("coffee now, dev never" mug) and more! There's just one catch: items relevant to your projects are discounted, encouraging making projects that YOU will actually use. For example, if you make a Minecraft server provisioner, you'll get a discount on a Minecraft license key.
* Use your creations in future projects. Create a PaaS, and deploy your application on-demand at lower cost than services like Railway. Design a database provisioner, and spin up databases quicklier than the hyperscalers.

### Structure

#### Landing Page

The Landing Page is split into six sections:
* **Hero**: explains what the YSWS is about and showcases some of the tools participants will be using, with a terminal
* **Flow**: explains how it works using an architecture diagram with animated cables
* **Prizes**: shows the various prizes participants can get with various cards, and explains the discount mechanic
* **FAQ**: answers some frequently asked questions using accordions
* **Footer**: contains common links to Hack Club resources

#### App

The application is a WebOS decorated as a screen in the middle of the frozen tundra. It has various files with different uses:
* **Projects**: managing projects (CRUD)
* **Shop**: purchasing items using currency from projects
* **Explore**: exploring projects made by other people
* **Guides**: getting started with infra through guides
* **Docs**: reading documentation for the program

None of the files have been implemented yet.

#### Internal Dashboard

An internal dashboard will be implemented in the future.

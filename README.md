# improv

Improv is a Hack Club YSWS centered around shipping provisioning toolings to receive infrastructure-related prizes and discounts. This repository contains the website for Improv, built on NextJS. Currently, only the landing page is implemented, with more to come soon.

## Quick Start

To run the website, use `npm run dev`. To build the website, use `npm run build`.

## Knowledge Base

### Basics

#### Why
Many Hack Clubbers rely on services like Railway or Vercel without actually understanding what happens under the hood. When these services no longer meet their needs (price, features, reliability...), they're stuck. At the same time, Hack Clubbers make a lot of awesome projects, which are left behind to collect dust while they work on their next project.

#### How
Improv aims to change that by teaching participants about the very infrastructure they depend on by exploring Linux, networking, infrastructure as code, automation, security, DevOps and more. Along the way, they will build tooling that they can rely on in their future projects. After all, infrastructure is everywhere.

#### What
**YS:** Build infrastructure projects using existing tools (such as Terraform or Ansible) or create your own tools, whether that be a bash script to set up a server, a container orchestrator, an image builder or anything else you can think of!
**WS:** Earn Uptime depending on the complexity and hours spent on your project. Redeem it for typical YSWS rewards (hosting credits, domains, Minecraft...) or Improv-exclusive items (ePaper Display for monitoring, "works on my machine"). There's just one catch: items relevant to your projects are discounted. For example, if you make a Minecraft server provisioner, you'll get a discount on a Minecraft license key.

### Structure

#### Landing Page

The Landing Page is split into six sections:
* **Hero:** explains what the YSWS is about and showcases some of the tools participants will be using, with a terminal
* **Flow:** explains how it works using an architecture diagram with animated cables
* **Prizes:** shows the various prizes participants can get with various cards, and explains the discount mechanic
* **FAQ:** answers some frequently asked questions using accordions
* **Footer:** contains common links to Hack Club resources

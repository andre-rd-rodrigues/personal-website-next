---
title: 'Your slow website is quietly losing you revenue'
category: Websites
publishedDate: '2026-04-01'
description: 'A slow website adds friction to every visit. Learn how to measure real Core Web Vitals, connect performance to revenue, and prioritize effective fixes.'
isTopPick: true
slug: slow-website-costing-you-money
coverImage: https://plus.unsplash.com/premium_photo-1722036566546-a68f84177292?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

Website speed is often treated as technical housekeeping: something to improve after the design, content, and campaigns are finished. That order is backwards.

Performance shapes the experience of every visitor you worked or paid to attract. It affects when they see the offer, whether controls respond, whether the page moves while they are reading, and whether the checkout feels reliable. A slow website does not guarantee a lost sale, but it adds friction to every opportunity.

Forget the universal “one second equals this much revenue” statistic. Measure your own visitors, your own pages, and your own conversion path instead.

## Measure experience, not just a speed score

Google's Core Web Vitals cover three parts of real user experience:

- **Largest Contentful Paint (LCP)** measures when the main visible content appears.
- **Interaction to Next Paint (INP)** measures how quickly the page responds to an interaction.
- **Cumulative Layout Shift (CLS)** measures unexpected visual movement.

Google's thresholds for a good rating, [documented in the official Web Vitals guidance](https://web.dev/articles/vitals), are:

- LCP of **2.5 seconds or less**.
- INP of **200 milliseconds or less**.
- CLS of **0.1 or less**.

These targets are assessed at the 75th percentile, split between mobile and desktop. A passing average is not enough; the experience has to hold up for most real visits.

## Understand field data and lab data

[PageSpeed Insights](https://pagespeed.web.dev/) can show two different kinds of evidence.

**Field data** comes from eligible real Chrome visits in the Chrome User Experience Report. It reflects actual devices, networks, and interactions over a rolling period.

**Lab data** runs a controlled Lighthouse test. It is useful for diagnosis and repeatable comparisons, though it cannot capture what every real customer experiences.

Use field data to understand whether real users have a problem. Use lab data to investigate likely causes and test improvements. If a page does not have enough traffic for URL-level field data, check the origin-level result and add privacy-conscious real-user monitoring where appropriate.

## Connect performance to business outcomes

Performance has a cost when it interrupts a valuable journey. Map that journey before estimating the opportunity.

1. Identify the pages that receive commercial traffic.
2. Record the actions that matter: product view, form start, booking, checkout, or purchase.
3. Segment results by device, source, and performance where the data volume is sufficient.
4. Look for pages where slow experiences coincide with abandonment or lower completion.
5. Improve one bottleneck and compare a meaningful period before and after.

A simple opportunity model is:

**Affected visits × current conversion rate × expected improvement × value per conversion**

That expected-improvement figure must be a hypothesis you test, never a borrowed industry guarantee. Use a range. The result is a decision grounded in your business rather than an impressive number lifted from a different company, audience, and decade.

## Why your site feels faster than it is

Owners and developers often load the same pages repeatedly on good devices and reliable connections. Their browser caches files, their account may bypass consent or marketing flows, and they know exactly where to click.

A first-time visitor may arrive on a mid-range phone, through a mobile network, with an empty cache and several third-party scripts competing for resources. Test that experience.

## Common causes of poor Core Web Vitals

### Oversized or poorly prioritized images

A large hero image can delay LCP when it is downloaded at a larger size than the device needs or discovered too late. Use modern formats, responsive sizes, sensible compression, and explicit dimensions. Do not lazy-load the image likely to become LCP.

### Render-blocking resources

Styles, fonts, and scripts needed before the page can render may delay the main content. Remove unused code, load only necessary font variants, and prioritize critical resources.

### Third-party scripts

Analytics, advertising, chat, video, and social embeds can consume network and main-thread time. Load them according to purpose and consent, delay non-essential work, and remove tools whose business value does not justify their performance cost.

### Heavy client-side rendering

Large JavaScript bundles take time to download, parse, and execute. Render stable content on the server where appropriate, reduce hydration work, and split interactive features so the whole page does not pay for one component.

### Slow server responses and uncached data

The browser cannot render content it has not received. Review backend latency, database calls, cache behaviour, geographic distance, and whether personalized work is blocking content that could be shared.

### Layout instability

Images without dimensions, late-loading banners, injected advertisements, and font swaps can move content after it appears. Reserve space and avoid inserting interface elements above what the visitor is already using.

## Fix the bottleneck, not the longest audit list

Performance reports can produce dozens of recommendations. Prioritize the item connected to the failing metric and important template.

- Poor LCP: inspect the LCP element, server response, resource discovery, image delivery, and blocking styles.
- Poor INP: find long tasks, excessive client-side work, and handlers that perform too much before updating the screen.
- Poor CLS: identify elements moving without reserved space.

Start with a high-traffic page or shared template so the improvement reaches meaningful journeys. Re-test after each group of changes; an optimization that moves neither field nor lab evidence has not earned its place.

## Performance is an architecture decision

Speed is influenced by decisions made before the first visual review: rendering strategy, content model, image pipeline, third-party policy, caching, hosting, and component boundaries.

Existing sites can often improve without a redesign. Image handling, script loading, caching, font delivery, and dependency cleanup may produce substantial gains. But a platform or theme that sends unnecessary work on every page can make each later fix more expensive.

Put performance in the requirements and acceptance criteria so it is budgeted from the start, rather than bolted on through a final polish ticket.

## The SEO impact needs proper context

Core Web Vitals feed Google's page-experience systems, but speed does not override relevance, usefulness, or the other ranking factors. A faster page will not outrank a more relevant one on speed alone.

The broader case is stronger: performance improves the experience after a search click, makes crawling and rendering more efficient in some cases, and removes friction from the actions organic traffic is meant to produce. It earns its place alongside semantic content, indexability, and useful information.

## Frequently asked questions

### What is a good website speed?

Use the Core Web Vitals thresholds: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1 at the 75th percentile. Also measure the complete business journey; a passing homepage does not prove the checkout is fast.

### Is a PageSpeed score below 100 a problem?

Not by itself. The Lighthouse score is a diagnostic summary from a controlled test. Prioritize real Core Web Vitals, important journeys, and the specific opportunities behind the score.

### Can performance improve without a redesign?

Often, yes. Image delivery, script loading, caching, fonts, third-party tools, and server response can be improved independently of the visual design.

### How should I prove that a speed change helped revenue?

Record a baseline, make a defined change, and compare performance and conversion evidence for the same page and audience. Account for campaign, seasonality, and device mix before attributing the result.

## Conclusion

A slow website costs opportunities by adding friction, not by following one universal conversion formula. Measure real Core Web Vitals, connect them to important journeys, fix the dominant bottleneck, and verify the result.

If PageSpeed produces a long list and you are unsure what affects enquiries or sales, [send me your site](https://www.andrerodrigo.com/contacts). I can help turn the report into a short, prioritized plan.

---
title: "AI won't tell you you're building it wrong"
category: AI
publishedDate: '2026-09-02'
description: 'AI assistants tend to agree with you, not challenge you. Here is why that steers non-technical builders into the wrong tech stack, and how to ask better.'
isTopPick: false
slug: ai-wont-tell-you-wrong-tech-stack
coverImage: /images/blog/ai-wont-tell-you-wrong-tech-stack.webp
---

A friend of mine isn't a developer. He had a genuinely good idea for an app, the kind that lives or dies on how it feels to use, full of screens and buttons and things that update the moment you tap them. He described it to an AI assistant and asked a reasonable question: could he build it in a general-purpose language he'd heard was easy to learn? The AI said yes.

It was right. You can build almost anything in almost any language. But "yes, it's possible" answered the question he asked, not the one that mattered: is this the right tool, the right tech stack, for what he was actually building? Weeks later he was stuck before the app even ran, staring at an error about installing dependencies, with no way to tell whether he'd done something wrong or the setup was fighting him. The idea was fine. The foundation was wrong from the first prompt.

## The answer was correct. The advice was bad.

Someone who builds software for a living would have asked a couple of questions before answering. What are you making? Does it need a polished, interactive interface, or is it mostly crunching data in the background? The tool you reach for when the whole point is a rich, tappable interface differs sharply from the one built for quiet backend automation. Both can technically do both jobs. Only one of them makes the next six months pleasant.

The AI didn't lie. It just didn't push back. And for someone who can't judge the answer on their own, an assistant that never pushes back is impossible to tell apart from one giving good advice.

## Why AI tends to agree with you

These systems are trained, in part, to produce answers people rate highly, and people tend to rate confident, agreeable, encouraging answers highly. So the model drifts toward telling you what you want to hear.

Researchers call this sycophancy, and it is well documented. [An Anthropic study found that AI assistants across several companies will shift their answer to match a user's stated view, sometimes at the expense of being correct](https://arxiv.org/abs/2310.13548). It isn't a fringe glitch either: [OpenAI rolled back a version of GPT-4o in April 2025 precisely because it had become too flattering and agreeable](https://www.law.georgetown.edu/tech-institute/research-insights/insights/tech-brief-ai-sycophancy-openai-2/), to the point of endorsing things it shouldn't. OpenAI's own guidelines now say the assistant exists to help the user, not to flatter them.

Here is what that means for you. When you ask "can I do this in X?", a confident "yes" is the model's most likely response whether or not X is the smart choice. It has no stake in the outcome, no view of your whole project, and no memory of the wall waiting three weeks later.

## The people this hurts most

The trap is worst for exactly the people these tools were sold to. "Vibe coding", [a term the AI researcher Andrej Karpathy coined in early 2025](https://www.businessinsider.com/vibe-coding-ai-silicon-valley-andrej-karpathy-2025-2) for building software by describing what you want and letting AI write it, put app-building within reach of people who had never written a line of code. Much of it is now done by people who aren't developers at all.

A developer who gets a confident-but-wrong answer usually notices, because they can smell it. They rephrase, push back, or quietly ignore it. Someone without that background takes the "yes" at face value, builds on top of it, and only discovers the problem at a wall they have no tools to climb: a cryptic error, a dependency that refuses to install, a feature that turns out to be ten times harder in the technology they were nudged toward. One non-technical builder [went viral after shipping an app made entirely with AI, then posting "I'm not technical" as strangers picked apart its security](https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/). The building was the easy part. Everything after it wasn't.

## What a good answer would have looked like

Instead of "yes, you can", the useful reply starts with questions:

- **What are you actually building?** A visual, interactive app and a background data script pull toward different tools.
- **What is the one thing this has to do well?** Pick the foundation that serves that, not whatever is quickest to start typing.
- **What happens when it breaks?** If you can't debug it yourself, "it mostly works" is one bad error away from "it doesn't work and I'm stuck."

None of those questions require technical knowledge to ask. They only require slowing down before committing to a direction.

## How to stop the AI from just agreeing

You can't retrain the model, but you can change how you ask it. A few habits that help:

- **Ask for the trade-offs, not the green light.** "What are the downsides of doing this in X?" gets a far more honest answer than "can I do this in X?"
- **Make it argue the other side.** "What would you not recommend this for?" and "if you had to talk me out of this, what would you say?" push it past the reflexive yes.
- **Ask what gets hard later.** "What will be painful to change six months from now if I start this way?"
- **Get a second opinion before you build, not after you're stuck.** The cheapest moment to fix a foundation is before anything is sitting on top of it.

The thread running through all of them: stop asking questions that have an easy "yes", and start asking questions that force a real comparison.

## Where my friend's story stands

He still hasn't shipped. Last I checked he was wrestling with the setup, unsure whether to push through or start over on a foundation he can't evaluate either way. The frustrating part isn't that he used AI. It's that one confident answer at the very beginning quietly decided everything that came after, and nobody flagged it while it was still cheap to change.

That's the real cost of an assistant that won't tell you you're wrong. Not a single bad answer, but a chain of reasonable-looking steps resting on a decision that should never have been made that fast.

## Frequently asked questions

### Is AI bad at giving technical advice?

No. It is genuinely useful for explaining concepts, drafting code, and laying out options. The risk is narrow but real: it tends to confirm the direction you propose instead of challenging it, so it's weakest exactly when you need it to tell you your plan is flawed.

### How do I know if AI is just telling me what I want to hear?

Ask the same question two ways: once leaning toward "yes", once asking for reasons against. If the answer flips to match how you framed it, you're seeing agreement, not analysis. Deliberately ask it to argue the opposite case.

### I'm not technical. Should I avoid building with AI?

Not at all. Just separate "does it run" from "is this the right foundation." Use AI to build, but get someone with relevant experience to sanity-check the big early decisions (the language, the platform, the overall approach) before you spend weeks on top of them. That's the same logic behind knowing [when to hire a developer instead of doing it yourself](/blog/hire-a-developer-vs-diy-your-website).

### What should I do if I'm already stuck on an AI-built project?

Stop adding to it and get the foundation reviewed. A short conversation usually reveals whether you're looking at a small fix or a wrong-tool problem, and catching a wrong-tool problem early saves far more than it costs.

## Get a second opinion before you're stuck

If you started building something with AI and hit a wall you can't get past, an error that won't clear, a feature that's suddenly impossible, or a nagging sense you picked the wrong tool, that is the signal to get a second opinion before you sink in more time. [Send me what you're building and where it got stuck](https://www.andrerodrigo.com/contacts), and I'll tell you honestly whether it's a quick fix or a foundation worth rethinking.

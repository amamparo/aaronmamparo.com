---
title: Advent of Go
date: 2024-02-03
tags: [ coding, golang, tdd, advent-of-go ]
imageUrl: /golang.jpeg
---

Over the next few weeks, I'll be solving [Advent of Code 2023](https://adventofcode.com/2023)
challenges with the Go programming language and sharing my experience here.

Why?

---

## To Learn Go

It's [been a minute](https://www.urbandictionary.com/define.php?term=it%27s%20been%20a%20minute)
since I learned a new programming language, and [Go](https://go.dev/) has been on my radar for a while.

I'm a huge fan of Python. I make heavy use of its `typing` module to leave type hints in my code.
Unfortunately, though, Python type hints are just that: hints. They're not enforced anywhere except
passively by the IDE. I predict that I'll enjoy Go's static-typing.

I've also heard that Go is much more performant than Python, especially when it comes to concurrent
tasks, so I'm looking forward to reaping those benefits as well.

---

## To Become Better At TDD

[Test-Driven Development](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
(TDD) is a development practice that dictates that you:

1. Write only enough production code to pass a failing unit test
2. Write no more of a unit test than is sufficient to fail
3. Write no more production code than is necessary to pass the one failing unit test

I was introduced to TDD about 6 years ago by a co-worker who I now regard as one of my most 
influential mentors. At the time, we were writing Java. I myself had a few years of experience
writing production Java code.

My Java experience, however, proved to be more of a hindrance than a help in learning TDD. It may
seem counterintuitive, but think about it. The more intimately you know a language, the more
confident you are in your ability to write working code. The more confident you are in your ability
to write working code, the less you feel the need to let tests guide your implementation.

> I know the lines of code I need to write, so just let me write them!  I'll test it later, dammit!

It was frustrating.  I felt like I was coding with one hand tied behind my back.  But, with some
coaching and assurance from my mentor, I persisted, and I eventually saw the light.  By learning to
think in smaller increments and letting the tests guide my implementation, I found myself
catching edge cases and bugs that I otherwise would've missed (and probably wouldn't have 
written tests for after the fact).

Fast-forward a few years.  I would like to say that I've stayed true to TDD, but I haven't.  I 
realize in retrospect that I was part of a team that had a uniquely strong TDD culture, and so we 
held each other accountable.  I've since changed jobs, and while I do enjoy the culture of my 
current team, the lack of a strong emphasis on TDD has allowed me to let the habit atrophy.

My hope is that, through learning an unfamiliar programming language with which I have no 
confidence in my ability to write working code, I'll be forced to rely on TDD to guide my
solutions. Then, after re-vitalizing my TDD skills, I hope to bring it to my current team and 
try to make it a group habit.

---

## To Start A Writing Habit

This is my first blog post.  I've been meaning to start writing, but I (1) didn't know what to 
write about that hasn't already been written and (2) was afraid that even if I *did* write 
something, it would be a one-off post that would sit alone at the top of my homepage for months.

Then I realized,
on (1) - who cares? Even if my experience isn't unique, it's mine, so why not share it?
On (2) - this is the perfect opportunity to begin a new writing habit, since this will be a 
series of posts that will be followed-up on for a few weeks.

---

Keep an eye out for my follow-up entries under [#advent-of-code](/tag/advent-of-go/).  In each 
entry, I'll try to explain my thought process in as much detail as appropriate, especially around
the tests I'm writing to guide myself toward each challenge's solution. I'll include code 
snippets and GitHub links.  For at least the first few entries, there **will** be ugly
code, so feedback would be greatly appreciated.

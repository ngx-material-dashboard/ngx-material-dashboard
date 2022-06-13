---
sidebar_position: 2
---

# Library Structure

This library was created based on principles described in the following article
[https://martinfowler.com/bliki/PageObject.html](https://martinfowler.com/bliki/PageObject.html)
with some slight modifications. The article describes everything as a "page",
whereas I define significant elements as PageElements. Siginificant elements
can be simple things like a button, form field, checkbox, but they can also be
more complicated things like a form (with form fields), paged table, etc. As 
such PageElements can be made up of other PageElements (i.e. a paged table 
consists of a table and paginator elements). Following from this, Pages can be
made up of multiple PageElements.

Each PageElement contains useful methods and properties for that particular
element. For example, the ButtonElement contains a `click()` method which
clicks the button and waits for the fixture to be stable. So you can write the
following code in your tests:

```typescript
await button.click();
// test for whatever results you are expecting after button click
```

instead of having to write the following:

```typescript
button.click();
fixture.detectChanges();
await fixture.whenStable();
// test for whatever results you are expecting after button click
```

While this is a simple example, it can get very repetitive and tedious to write
`fixture.detectChanges()` and `await fixture.whenStable()` every time you need
to write tests that click a button. It also helps to make reading tests easier,
since anyone can look at the first block of code above and understand what is
happening without the need or clutter of boilerplate code. Take a look at the
API documentation to see the full list of PageElements and the capabilities I
have included for each.

> NOTE: I've tried to come up with as many general purpose PageElements as I could. I
> may add more if/when I come up with any additional PageElements.

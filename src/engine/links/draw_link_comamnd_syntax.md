# line drawing engine

## basic usage

to generate an SVG path (d attribute) you need to have:
1. a path definition (see below how to formulate one)
2. two Vec2d objects (e.g. the position of the source and target nodes of a link)

then to get a path that is constructed based on the given vector positions you do

```javascript
const pathDef = "..."
const from = new Vec2d(...)
const to = new Vec2d(...)
commands = parseDrawingCmds(tokenizeDrawingCommands(pathDef))
let d = Plotter.getPathTxt(from, to, commands)
```

## Basic command syntax

the above mentioned pathDef must be properly formatted string representation the drawing commands

command ([semicolon command] ...)

semicolon : { ";" }

command : {
  command_code ([colon transformation_vector] ...)
}

colon : { ":" }

transformation_vector : {
  number comma number [ perc_sign [ number comma number ] ]
}

comma : { "," }

perc_sign : { "%" }

number : (digit...) [ dot (digit...) ]

dot : {"."}

command_code : {
  {M|m|L|l|Q|q|T|t|C|c|a}
}

number of `transformation_vector` needed depends on the command_code:
* M, m, L, l - each require 1 `transformation_vector`
* Q, q, T, t, C, c - each require 3 `transformation_vector`s
* a - requires 4 `transformation_vector`s

## drawing principles

the generation looks as follows:

1. given the `from` and `to` vecotrs, the plotter establishes the `BASE` for drawing the path: where the path origin in (at `from`) and what general direction and size the path should have (along the `to.sub(from)` vector)

_example_
let `from` be (0,1) and `to` be (2,0). then:
- `BASE` origin is `(0,1)`
- `BASE` length is `sqrt(5)`
- `BASE` direction is towards orughly `pi/6` or so...

2. each of the `transformation_vector`s is interpreted as a translation in the reference system of the established `BASE`
   - either in absolute terms (pixels)
   - or as % of the `BASE` length
   - coordinates are ordered: first one is for translations along the base axis, second for translations normal to that (rotated clockwise)

_example_
a `transformation_vector` 10,50%2,3 means: translate `10% of BASE.length + 2` in `BASE` direction and `50% of BASE.length + 3` in direction normal to `BASE`

3. each resulting point (actual translation vector) is then used as a coordinate point for the selected SVG d command, which are:
   - M or m - move pen by given translation
   - L or l - draw straight line
   - Q or q - draw a quadratic bezier segment
   - C or c - draw a cubic bezier segment
   - a - draw an arch

 for all the commands apart from `a` the difference to normal SVG d commands is:
 * upper-case versions (M, L, Q, C) - resent the pen, i.e. implicitly move it to ~BASE~ origin first, and then draw according to the porvided translations.
 * lower-case version: continue drawing from wherever the pen finished after the previous command

 the arcs coded by the `a` command are always drown beginning at where the pen is after the last command. he three `transformation_vector`s, of the `a` command written as
 `x1,y1:x2,y2:x3,y3:x4,y4`
 are interpreted as follows
 * x1 and y1  - are radii of the ellipse to be drawn. Again: expressed as fixed + fraction of `BASE` length. (setting x1 = y1 results i na circle)
 * x2 and y2 - represent a vector who's argument will be the large axis rotation (setting it to `(1,0)` gives an ellipse who's longer axis is oriented along the `BASE` direction)
 * x3 - should be set only to either `0` or `1` and is equivalent to the `large-arc-flag` parameter of the SVG arc (1 = large)
 * y3 - should be set only to either `0` or `1` and is equivalent to the `sweep-flag` parameter of the SVG arc (1 = clock-wise)
 * x4 and y4 - represent the point where the arc should end. Setting it to `(0,0)` means the arc finishes where it started (back at `(x1,y1)`)

## examples

1. draw a simple line from start to end
`L:100,0%`

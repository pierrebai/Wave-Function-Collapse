
let tiles = []
let grid = []
const contradictions = []
const updateOtherOptions = new Bitmap()

let DIM = 40

let updateRadiusSquared = 10000

function setup() {
  createCanvas(1000, 1000)
  reset()
  createUI()
}

function reset() {
  background(0)
  tiles = []
  clearGrid()
  clearContradictions()
}

function clearContradictions() {
  for (let i = 0; i < DIM * DIM; i++) {
    contradictions[i] = 0
  }
}

function clearGrid() {
  grid = []
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length)
  }
}

function start() {
  background(0)
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length)
    contradictions[i] = 0
  }
  gridHistory = [grid]
  rewindDepth = minRewind
  maxHistory = 0

  queue_algorithm(new HybridWFC())
}

function mouseClicked(event) {
  logCellOptionsUnderMouse()
}

function draw() {
  if (drawTileOptions())
    return

  if (drawEdges())
    return

  progress = run_current_algorithm_at_fps()
  update_progress_ui(progress)

  drawGrid()
}

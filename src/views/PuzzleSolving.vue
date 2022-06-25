<template>
  <div class="puzzle">
    <div class="puzzle__top">
      <div
          class="puzzle__top__space"
          :style="{width: `${puzzle.numbers.longestRow * 30}px`, height: `${puzzle.numbers.longestCol * 30}px` }"></div>
      <div class="puzzle__top__numbers">
        <div v-for="(col, index) in puzzle.numbers.cols" :key="index">
          <div v-for="(number, _index) in col" :key="_index" class="puzzle__number">
            {{ number }}
          </div>
        </div>
      </div>
    </div>
    <div class="puzzle__bottom">
      <div class="puzzle__bottom__numbers">
        <div
            v-for="(row, index) in puzzle.numbers.rows" :id="`row-${index + 1}`"
            :key="index"
            class="puzzle__bottom__numbers__row">
          <div
              v-for="(number, _index) in row" :id="`row-${index + 1}_tile-${_index + 1}`" :key="_index"
              class="puzzle__number">
            {{ number }}
          </div>
        </div>
      </div>
      <div class="puzzle__bottom__image">
        <div v-for="y in puzzle.image.height" :key="y" class="puzzle__bottom__image__row">
          <div v-for="x in puzzle.image.width" :key="x">
            <PuzzleTile :x="x" :y="y" :correct="puzzle.getValueByCoords(x, y)" @update="Puzzle.changeValue"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import PuzzleTile from "@/components/PuzzleTile.vue"

class Tile {
	constructor(x, y, correct) {
		this.x = x;
		this.y = y;
		this.correct = correct;
		this.value = 0
	}
}

class Puzzle {
	constructor(width, height, image) {
		this.image = {
			puzzle: image,
			width: width,
			height: height
		};
		this.tiles = [];
		this.rows = [];
		this.cols = [];
		this.numbers = {
			rows: [],
			cols: [],
			longestRow: 0,
			longestCol: 0
		}
		this.createTiles();
		this.preparePuzzle();
		this.size = {
			width: this.numbers.longestRow + this.image.width,
			height: this.numbers.longestCol + this.image.height
		}
	}

	createTiles() {
		let x = 1, y = 1;
		this.image.puzzle.split('').forEach(tile => {
			this.tiles.push(new Tile(x, y, parseInt(tile)))
			if (x % this.image.width === 0) {
				x = 1;
				y++;
			} else x++;
		})
	}

	preparePuzzle() {
		for (let i = 1; i <= this.image.width; i++) {
			this.rows.push((this.tiles.filter(tile => tile.x === i)))
		}
		for (let i = 1; i <= this.image.height; i++) {
			this.cols.push((this.tiles.filter(tile => tile.y === i)))
		}
		this.rows.forEach(row => {
			let count = 0;
			const _row = []
			row.forEach(tile => {
				if (tile.correct && tile.y === this.image.width) {
					count++
					_row.push(count);
					count = 0
				} else if (tile.correct) count++
				else if (!tile.correct && count > 0) {
					_row.push(count);
					count = 0
				}
			})
			this.numbers.rows.push(_row);
		})
		this.cols.forEach(col => {
			let count = 0;
			const _col = []
			col.forEach(tile => {
				if (tile.correct && tile.x === this.image.width) {
					count++
					_col.push(count);
					count = 0
				} else if (tile.correct) count++
				else if (!tile.correct && count > 0) {
					_col.push(count);
					count = 0
				}
			})
			this.numbers.cols.push(_col);
		})

		this.numbers.rows.forEach(row => {
			if (row.length > this.numbers.longestRow) this.numbers.longestRow = row.length
		})
		this.numbers.cols.forEach(col => {
			if (col.length > this.numbers.longestCol) this.numbers.longestCol = col.length
		})
	}

	getValueByCoords(x, y) {
		return this.tiles.find(tile => tile.x === x && tile.y === y).correct
	}

	static changeValue(x, y, value) {
		const tile = puzzle.tiles.find(tile => tile.x === x && tile.y === y)
		Object.assign(tile, {value})
		puzzle.checkResult()
	}

	checkResult() {

		document.getElementById('row-1_tile-1').style.color = 'red'

		const filledTiles = this.tiles.filter(tile => tile.value === 1).length
		const shouldBeFilled = this.tiles.filter(tile => tile.correct === 1).length
		console.log(filledTiles, shouldBeFilled)
		if (filledTiles === shouldBeFilled) {
			if (this.tiles.filter(tile => tile.value === tile.correct && tile.value === 1).length === shouldBeFilled) {
				console.log('Win!')
			}
		}
	}
}

const puzzle = new Puzzle(3, 3, "101010101")
console.log(puzzle);


</script>
<style lang="scss">
.puzzle {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;

    &__numbers {
      display: flex;
      align-items: flex-end;
    }
  }

  &__space {
    background-color: #333333;
  }

  &__bottom {
    display: flex;

    &__numbers {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      &__row {
        display: flex;
      }
    }

    &__image {
      &__row {
        display: flex
      }
    }
  }

  &__number {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #777777;
    font-weight: bold;
  }
}
</style>

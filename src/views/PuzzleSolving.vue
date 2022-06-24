<template>
  <div class="puzzle">
    <div class="puzzle__container__top">
      <div
          class="puzzle__container__top__space"
          :style="{width: `${ResolvingPuzzle.longestRow * 25}px`,
           height: `${ResolvingPuzzle.longestCol * 25}px`}">
      </div>
      <div class="puzzle__container__top__numbers">
        <div v-for="(_, cindex) in ResolvingPuzzle.colNumbers" :key="cindex">
          <div v-for="(_, rindex) in ResolvingPuzzle.colNumbers[cindex]" :key="rindex">
            <div class="grid grid__number">{{ ResolvingPuzzle.colNumbers[cindex][rindex] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="puzzle__container__bottom">
      <div class="puzzle__container__bottom__numbers">
        <div
v-for="(_, rindex) in ResolvingPuzzle.rowNumbers" :key="rindex"
             class="puzzle__container__bottom__numbers__row">
          <div v-for="(_, cindex) in ResolvingPuzzle.rowNumbers[rindex]" :key="cindex">
            <div class="grid grid__number">{{ ResolvingPuzzle.rowNumbers[rindex][cindex] }}</div>
          </div>
        </div>
      </div>
      <div class="puzzle__container__content">
        <div v-for="(row, rindex) in ResolvingPuzzle.height" :key="rindex" class="puzzle__container__content__row">
          <div v-for="(col, cindex) in ResolvingPuzzle.width" :key="cindex" class="puzzle__container__content__col">
            <div
                :class="[parseInt(ResolvingPuzzle.image[(col-1)*ResolvingPuzzle.width+(row-1)]) ? 'grid__filled' : 'grid__empty']"
                class="grid"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

class Puzzle {
	constructor(width, height, image) {
		this.width = width;
		this.height = height;
		this.image = image.split('');
		this.size = height * width;
		this.colNumbers = [];
		this.rowNumbers = [];
		this.longestRow = 0;
		this.longestCol = 0;
	}

	getNumbers() {
		for (let x = 0; x < this.height; x++) {
			let rcount = 0;
			let ccount = 0;
			const row = [];
			const col = [];
			for (let y = 0; y < this.width; y++) {
				// najpierw dla wierszy
				let rposition = x * this.width + y
				let rtile = !!parseInt(this.image[rposition])
				if (rtile) rcount++
				else if (!rtile && rcount > 0) {
					row.push(rcount)
					rcount = 0;
				}
				// potem dla kolumn
				let cposition = y * this.height + x
				let ctile = !!parseInt(this.image[cposition])
				if (ctile) ccount++
				else if (!ctile && ccount > 0) {
					col.push(ccount)
					ccount = 0;
				}

			}
			if (rcount) row.push(rcount)
			if (ccount) col.push(ccount)
			this.rowNumbers.push(row);
			this.colNumbers.push(col);
		}

		this.rowNumbers.forEach(row => {
			if (row.length > this.longestRow) this.longestRow = row.length
		})

		this.colNumbers.forEach(col => {
			if (col.length > this.longestCol) this.longestCol = col.length
		})
	}
}

const image = "0000111100000000000000001011100000000000000100001000000000000001010010001110000000110000100110100000011100110110110000011111111111011110000110000011101100100001010001011110001011110010100111000111101101010101010011100011100000110001100001111111111100110000110000110000000000011000001100000000001100000011100000000111000000011110000011100000000011111111100000000000001000100000000011100111011101111111"
console.log(image.split(''))

const ResolvingPuzzle = new Puzzle(20, 20, image)
ResolvingPuzzle.getNumbers()
console.log(ResolvingPuzzle)

</script>
<style lang="scss">
.puzzle {
  &__container {

    &__content {
      display: flex;

      &__row {
        display: flex;
        flex-direction: column;
      }
    }

    &__top {
      display: flex;

      &__space {
        background-color: lightgray;
      }

      &__numbers {
        display: flex;
        align-items: end;
      }
    }

    &__bottom {
      display: flex;

      &__numbers {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &__row {
          display: flex;
          align-items: end;
        }
      }
    }
  }

  &__numbers {
    &__rows {
      display: flex;
      flex-direction: row;
    }

    &__cols {
      &__row {
        display: flex;
        flex-direction: column;
      }
    }
  }
}


.grid {
  height: 25px;
  width: 25px;
  border: 1px solid black;

  &__empty {
    background-color: white;
  }

  &__filled {
    background-color: black;
  }

  &__number {
    font-weight: bold;
    text-align: center;
    vertical-align: center;
  }
}
</style>

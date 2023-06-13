<template>
	<div class="mainPage">
		<h2>Оценки студента Иванова И.И.</h2>

		<div class="customCalc">
			<div>
				<label>Название предмета:</label>
				<input
					ref="subjectInput"
					v-model="title"
					type="text"
				>
			</div>

			<div>
				<label>Количество оценок:</label>
				<input
					ref="gradesInput"
					v-model="numberOfGrades"
					type="number"
					@change="updateGrades"
				>
			</div>

			<div
				v-if="grades.length > 0"
				class="evaluations"
			>
				<div
					v-for="(_, index) in grades"
					:key="index"
					class="evaluations__item"
				>
					<input
						:ref="`gradeInput_${index}`"
						v-model="grades[index]"
						type="number"
						min="1"
						max="5"
					>
				</div>
			</div>

			<div class="passes">
				<div>
					<label>Доля пропущенных занятий (уважительные причины):</label>
					<input
						v-model="validAbsences"
						type="number"
					>
				</div>
				<div>
					<label>Доля пропущенных занятий (неуважительные причины):</label>
					<input
						v-model="invalidAbsences"
						type="number"
					>
				</div>
			</div>

			<button
				class="customBtn"
				@click="calculateResults"
			>
				Рассчитать
			</button>

			<div v-if="resultsCalculated">
				<h2>Результаты:</h2>
				<p v-if="isPassing">
					Зачет получен!
				</p>
				<p v-else>
					Зачет не получен.
				</p>
				<p>Средний балл: {{ averageGrade }}</p>
				<p>Доля пропущенных занятий (уважительные причины): {{ validAbsencePercentage }}%</p>
				<p>Доля пропущенных занятий (неуважительные причины): {{ invalidAbsencePercentage }}%</p>
				<button
					class="customBtn"
					@click="addStorage"
				>
					Сохранить
				</button>
			</div>
		</div>
		<div
			v-if="lessons.length > 0"
			class="lastResults"
		>
			<h2>Результаты прошлых предметов:</h2>
			<div
				v-for="(item, idx) in lessons"
				:key="idx"
			>
				<p>
					{{ item.result ? 'Зачет получен!' : 'Зачет не получен.' }}
				</p>
				<p>Средний балл: {{ item.eval }}</p>
				<p>Доля пропущенных занятий (уважительные причины): {{ item.validAbsences }}%</p>
				<p>Доля пропущенных занятий (неуважительные причины): {{ item.invalidAbsences }}%</p>
			</div>
		</div>
	</div>
</template>

<script>


export default {
	data() {
		return {
			title: '',
			numberOfGrades: 0,
			grades: [],
			validAbsences: 0,
			invalidAbsences: 0,
			resultsCalculated: false,
			averageGrade: 0,
			validAbsencePercentage: 0,
			invalidAbsencePercentage: 0,
			isPassing: false,
			lessons: []
		}
	},
	computed: {
		titleFilled() {
			return this.title.trim() !== ''
		},
		numberOfGradesFilled() {
			return this.numberOfGrades > 0
		},
		validAbsencesFilled() {
			return this.validAbsences >= 0
		},
		invalidAbsencesFilled() {
			return this.invalidAbsences >= 0
		},
	},
	mounted() {
		this.checkStorage()
	},
	methods: {
		checkStorage() {
			const check = localStorage.getItem("lessons")
			this.lessons = !check ? [] : JSON.parse(check)
		},
		addStorage() {
			const newLesson = { title: this.title, eval: this.averageGrade, result: this.isPassing, validAbsences: this.validAbsencePercentage, invalidAbsences: this.invalidAbsencePercentage }
			this.lessons.push(newLesson)
			localStorage.setItem('lessons', JSON.stringify(this.lessons))

			this.title = ''
			this.numberOfGrades = 0
			this.grades = []
			this.validAbsences = 0
			this.invalidAbsences = 0
			this.resultsCalculated = false
			this.averageGrade = 0
			this.validAbsencePercentage = 0
			this.invalidAbsencePercentage = 0
			this.isPassing = false
		},
		updateGrades() {
			this.grades = Array.from({ length: this.numberOfGrades }, () => 5)
		},
		gradeFilled(index) {
			return this.grades[index] >= 0
		},
		calculateResults() {
			if (
				!this.titleFilled ||
				!this.numberOfGradesFilled ||
				!this.validAbsencesFilled ||
				!this.invalidAbsencesFilled ||
				this.grades.some((grade) => grade < 0 || grade > 5)
			) {
				alert('Пожалуйста, заполните все поля корректно.')
				if (!this.titleFilled) {
					this.$refs.subjectInput.focus()
				} else if (!this.numberOfGradesFilled) {
					this.$refs.gradesInput.focus()
				} else if (!this.validAbsencesFilled) {
					this.$refs.validAbsencesInput.focus()
				} else if (!this.invalidAbsencesFilled) {
					this.$refs.invalidAbsencesInput.focus()
				} else {
					for (let i = 0; i < this.grades.length; i++) {
						if (!this.gradeFilled(i)) {
							this.$refs[`gradeInput_${i}`][0].focus()
							break
						}
					}
				}
				return
			}

			const sum = this.grades.reduce((accumulator, grade) => accumulator + grade, 0)
			this.averageGrade = sum / this.numberOfGrades
			this.validAbsencePercentage = Math.floor((this.validAbsences / this.numberOfGrades) * 100)
			this.invalidAbsencePercentage = Math.floor((this.invalidAbsences / this.numberOfGrades) * 100)

			// Проверка условий для получения зачета
			this.isPassing = (this.averageGrade > 4 && this.invalidAbsencePercentage < 10) ? true : false

			this.resultsCalculated = true
		},
	},
}
</script>

<style lang="scss">
input {
	padding: 5px 20px;
	border: 1px solid #333;
}

.selectedId {
	padding: 8px;
	font-size: 16px;
	border: 1px solid #333;
	border-radius: 4px;
	width: 100px;
	margin-right: 10px;
}

.mainPage {
	margin-top: 5%;
	min-height: 50vh;
}

.customCalc {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	font-size: 1.3rem;
}

.customBtn {
	border: 1px solid #000;
	padding: 0.5rem 1.3rem;
	font-size: 1.3rem;
	max-width: 30vh;
	margin: 2rem auto 0;
}

.evaluations {
	margin-top: 2rem;
	font-size: 1.5rem;
	display: flex;
	flex-wrap: wrap;

	&__item {
		width: 10%;

		input {
			width: 100%;
		}
	}
}

.lastResults {
	font-size: 1.3rem;

	div {
		margin-top: 10px;
	}
}
</style>

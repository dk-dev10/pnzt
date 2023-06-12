<template>
	<div class="mainPage">
		<h2>Оценки студента Иванова И.И.</h2>
		<form
			class="customForm"
			@submit.prevent.stop
		>
			<div class="formItem">
				<label for="title">Название пары: </label>
				<input
					id="title"
					v-model="title"
					placeholder="Назвние предмета"
				>
			</div>
			<button
				class="customBtn"
				@click="addLesson"
			>
				Добавить
			</button>
		</form>
		<!-- Раздел Оценок -->
		<div class="evaluations">
			<table v-if="lessons.length >= 1">
				<thead>
					<tr>
						<th>Предмет</th>
						<th>Оценки</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(ev, idx) in lessons"
						:key="idx"
					>
						<td>{{ ev.title }}</td>
						<td>
							<ul>
								<li
									v-for="(evls, uid) in ev.evaluations"
									:key="uid"
								>
									{{ evls }}
								</li>
							</ul>
						</td>
						<td
							v-if="ev?.evaluations.length < 10"
							class="addEval"
						>
							<select
								id="selectedId"
								v-model="select"
								class="selectedId"
							>
								<option value="1">
									1
								</option>
								<option value="2">
									2
								</option>
								<option value="3">
									3
								</option>
								<option value="4">
									4
								</option>
								<option value="5">
									5
								</option>
								<option value="уваж">
									уваж
								</option>
								<option value="неуваж">
									неуваж
								</option>
							</select>
							<button
								class="customBtn"
								@click="() => addEval(idx)"
							>
								+
							</button>
						</td>
						<td
							v-else
							class="resultExam"
							:class="{ 'resultExamNot': !ev.status }"
						>
							{{ ev.status ? 'Зачёт' : 'НеЗачёт' }}
						</td>
					</tr>
				</tbody>
			</table>

			<div
				v-else
				class="empty__evaluations"
			>
				Добавьте название пары сверху!
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			lessons: [],
			select: '5'
		}
	},

	mounted() {
		this.checkStorage()
	},

	methods: {
		addLesson() {
			if (this.title.length >= 1) {
				const newLesson = { title: this.title, evaluations: [], status: null }
				this.lessons.push(newLesson)
				localStorage.setItem('lessons', JSON.stringify(this.lessons))
				this.title = ''
			}
		},

		addEval(index) {
			this.lessons[index].evaluations.push(this.select)
			const sum = this.lessons[index].evaluations.reduce((prev, curr) => {
				return prev += Number(curr)
			}, 0)
			const propuska = this.lessons[index].evaluations.reduce((prev, curr) => {
				if (curr === 'уваж') {
					prev.first += 1
				} else if (curr === 'неуваж') {
					prev.last += 1
				}
				return prev
			}, { first: 0, last: 0 })

			const res = sum / this.lessons[index].evaluations.length
			const resP = propuska.first / (propuska.first + propuska.last)
			this.lessons[index].status = (res < 4 || resP < .9) ? false : true
			localStorage.setItem('lessons', JSON.stringify(this.lessons))
			this.select = '5'
		},

		checkStorage() {
			const check = localStorage.getItem('lessons')
			this.lessons = !check ? [] : JSON.parse(check)
		}

	},
}
</script>

<style lang="scss">
input {
	padding: 5px 20px;
	border: 1px solid #333;
}

table {
	border-collapse: collapse;
	width: 100%;
}

th,
td {
	text-align: left;
	padding: 8px;
	border-bottom: 1px solid #ddd;
}

th {
	background-color: #f2f2f2;
}

tr {
	td {
		&:first-child {
			width: 15%;
		}

		width: 85%;

		ul {
			display: flex;
			width: 100%;

			li {
				width: 12%;
				border-left: 1px solid #000;
				padding: 0 10px;
				text-align: center;
			}
		}
	}

	&:hover {
		background-color: #f5f5f5;
	}
}

.addEval {
	display: flex;
}

.selectedId {
	padding: 8px;
	font-size: 16px;
	border: 1px solid #333;
	border-radius: 4px;
	width: 100px;
	margin-right: 10px;
}

/* Стилизация опций выпадающего списка */
.selectedId option {
	padding: 8px;
}

/* Стилизация выбранного значения */
.selectedId option:checked {
	background-color: #f2f2f2;
}

ul {
	list-style: none;
}

.mainPage {
	margin-top: 5%;
	min-height: 50vh;
}

.customBtn {
	border: 1px solid #000;
	padding: 0.5rem 1.3rem;
	font-size: 1.3rem;
}


.customForm {
	margin-top: 2rem;
	display: flex;
	gap: 1rem;


	.formItem {
		display: flex;
		align-items: center;
		font-size: 1.5rem;

		label {
			margin-right: 1rem;
		}
	}
}

.evaluations {
	margin-top: 2rem;
	font-size: 1.5rem;
}

.empty__evaluations {
	text-align: center;
	font-size: 1.8rem;
	color: #333;
	margin-top: 2rem;
}

.resultExam {
	padding: 1rem;
	background-color: green;

	&Not {
		background-color: red;
	}
}
</style>

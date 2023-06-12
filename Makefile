build:
	docker build -t dashboard-front .
run:
	docker run -p 8080:8080 --rm -v ${PWD}:/app -v /app/node_modules --name dashboard-front dashboard-front

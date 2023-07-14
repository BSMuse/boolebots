import { v4 as uuidv4 } from 'uuid';

class Bot {
	constructor(name, image, binaryValue, operator, speed, direction, gameStatus, formId) {
		this.id = uuidv4();
		this.name = name;
		this.image = image;
		this.labelColor = this.setLabelColor();
		this.binaryValue = binaryValue;
		this.operator = operator;
		this.direction = direction;
		this.coordinates = this.setCoordinates();
		this.timestamp = Date.now();
		this.speed = speed;
		this.wins = 0;
		this.losses = 0;
		this.gameStatus = gameStatus;
		this.formId = formId;
		this.movementId = uuidv4();
	}

	// Method to update name
	setName(name) {
		this.name = name;
	}

	// method to set formId
	setFormId(formId) {
		this.formId = formId;
	}

	// Method to update image
	setImage(image) {
		this.image = image;
	}

	// Creates random color for bot label
	setLabelColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);

		return `rgba(${r}, ${g}, ${b}, 0.5)`;
	}

	// Method to set binary value
	setBinaryValue(binaryValue) {
		this.binaryValue = binaryValue;
	}

	// Method to set operator
	setOperator(operator) {
		this.operator = operator;
	}

	// Method to set direction
	setDirection(direction) {
		this.direction = direction;
	}

	// Method to set initial coordinates based on direction
	setCoordinates() {
		const directionTable = {
			North: { rowIndex: 7, columnIndex: 3 },
			South: { rowIndex: 0, columnIndex: 3 },
			East: { rowIndex: 3, columnIndex: 0 },
			West: { rowIndex: 3, columnIndex: 7 },
		};
		this.coordinates = directionTable[this.direction];
	}

	// Method to upadte time of bot creation and movement
	updateTimestamp() {
		this.timestamp = Date.now();
	}

  // Method to update wins
  updateWins = () => {
    this.wins++;
  };

  // Method to update losses
  updateLosses = () => {
    this.losses++;
  };

	// Method to set speed
	setSpeed(speed) {
		this.speed = speed;
	}

	setGameStatus = (gameStatus) => {
		this.gameStatus = gameStatus;
	}

	// Method to retrieve the binary value of the bot (to use in Arena)
	getBinaryValue() {
		return this.binaryValue;
	}

	getOperator() {
		return this.operator;
	}

	// Method to get coordinates
	getCoordinates() {
		return this.coordinates;
	}

	// Method to get timestamp
	getTimestap() {
		return this.timestap;
	}

	// Method to get speed
	getSpeed() {
		return this.speed;
	}

	// Method to retrieve losses of the bot (to use in Leaderboard)
	getWinCount() {
		return this.wins;
	}

	// Method to retrieve Wins of the bot (to use in Leaderboard)
	getLossCount() {
		return this.losses;
	}
}

export default Bot;

class UMath {

	/** Angle **/

	static radianToDegree(radian){
		return radian / Math.PI * 180;
	}

	static degreeToRadian(degree){
		return degree * Math.PI / 180;
	}

	static resolve(angle){
		angle = angle % 360;

		if(angle < 0){
			angle = 360 + angle;
		}

		return angle;
	}

	/** Point **/

	static equation(point0, point1){
		let equation = {};
		equation.a = (point1.y - point0.y) / (point1.x - point0.x);
		equation.b = point0.y - equation.a * point0.x;

		return equation;
	}

	static distance(point0, point1){
		return Math.sqrt((point0.x - point1.x) * (point0.x - point1.x) + (point0.y - point1.y) * (point0.y - point1.y));
	}

	/** Min / Max **/

	static restrict(number, min, max){
		let realMin = UMath.minMax(min, max).min;
		let realMax = UMath.minMax(min, max).max;

		if(number < realMin){
			return realMin;
		}

		if(number > realMax){
			return realMax;
		}

		return number;
	}


	static restrictLoop(number, min, max, extrem){
		let realMin = UMath.minMax(min, max).min;
		let realMax = UMath.minMax(min, max).max;

		if(number < realMin){
			if(extrem){
				return realMax;
			}

			let moduloMin = (realMin - number) % (min - realMax - 1);
			moduloMin == 0 ? number = realMin : number = realMax - (moduloMin - realMin) + 1;

			number = realMax - moduloMin + 1;
		}

		if(number > realMax){
			if(extrem){
				return realMin;
			}

			let moduloMax = (number - realMax) % (realMax - min + 1);
			moduloMax == 0 ? number = realMax : number = (moduloMax - 1) + realMin;
		}

		return number;
	}


	static isBetween(number, min, max){
		return number == UMath.restrict(number, min, max);
	}

	static getBetween(min, max, float){
		let number = min + Math.random() * (max - min + (float ? 0 : 1));

		if(float){
			return number;
		}
		else {
			return number | 0;
		}
	}

	static minMax(min, max){
		if(min > max){
			return {min: max, max: min};
		}
		else {
			return {min: min, max: max};
		}
	}
}

export default UMath;

class WaterBuckets {

  constructor(smallBucketSize, largeBucketSize, targetSize) {

    // Validate parameters. Check that all three parameters 'smallBucketSize', 'largeBucketSize', and 
    // 'targetSize' exists and are of the type number.

    if (!smallBucketSize || !largeBucketSize || !targetSize) {
      throw new Error('The parameters smallBucketSize, largeBucketSize, and targetSize must be provided');
    }

    if (typeof smallBucketSize !== 'number') {
      throw new Error('smallBucketSize must be of type number')
    }

    if (typeof largeBucketSize !== 'number') {
      throw new Error('largeBucketSize must be of type number')
    }

    if (typeof targetSize !== 'number') {
      throw new Error('targetSize must be of type number')
    }

    if (smallBucketSize >= largeBucketSize) {
      throw new Error('smallBucketSize must be less than largeBucketSize');
    }

    if (targetSize >= largeBucketSize || targetSize <= smallBucketSize) {
      throw new Error('targetSize must be less than largeBucketSize and greater than smallBucketSize');
    }

    // Assign parameters to class properties.

    this.smallBucketSize = smallBucketSize;
    this.largeBucketSize = largeBucketSize;
    this.targetSize = targetSize;

  }

  smallToLarge() {

    let largeBucket = 0;
    let smallBucket = 0;
    let steps = 0;

    // Run the waterBuckets operation from small to large bucket in a while loop
    // that exits once the large bucket matches the target size.

    while (largeBucket !== this.targetSize) {

      // On each iteration increament the step.

      steps++;

      if (smallBucket === 0) {
        // If the small bucket is empty then fill it with water.

        smallBucket = this.smallBucketSize;
      } else if (largeBucket !== this.largeBucketSize) {
        // If the large bucket is not full then fill it with water
        // and remove an equal amount from the small bucket.

        const largeBucketTemp = largeBucket;
        largeBucket = largeBucket + smallBucket < this.largeBucketSize ? largeBucket + smallBucket : this.largeBucketSize;
        smallBucket -= (largeBucket - largeBucketTemp);
      } else if (largeBucket === this.largeBucketSize) {
        // If the large bucket is full then empty it out.

        largeBucket = 0;
      }

    }

    // Return an object with the properties steps and direction as the result.

    return {
      steps,
      direction: 'small to large',
    };

  }

  largeToSmall() {

    let largeBucket = 0;
    let smallBucket = 0;
    let steps = 0;

    // Run the waterBuckets operation from large to small bucket in a while loop
    // that exits once the large bucket matches the target size.

    while (largeBucket !== this.targetSize) {

      // On each iteration increament the step.

      steps++;

      if (largeBucket === 0) {
        // If the large bucket has no water then fill it with water.

        largeBucket = this.largeBucketSize;
      } else if (smallBucket !== this.smallBucketSize) {
        // If the small bucket is not full then fill it with water and remove and equal amount from
        // the large bucket.

        const smallBucketTemp = smallBucket;
        smallBucket = smallBucket + largeBucket < this.smallBucketSize ? smallBucket + largeBucket : this.smallBucketSize;
        largeBucket -= (smallBucket - smallBucketTemp);
      } else if (smallBucket === this.smallBucketSize) {
        // If the small bucket is full then empty it out.

        smallBucket = 0;
      }

    }

    // Return an object with the properties steps and direction as the result.

    return {
      steps,
      direction: 'large to small',
    };
  
  }

  run() {

    // Run both largeToSmall and smallToLarge functions and compare the stpes properties
    // returned from both. Return the result from the more performant function of the two
    // which is the result with fewer steps. If there is a tie return an object with a
    // results property. The results property is a string and explains there was a tie.
    // It includes the number of steps completed by both functions.

    const largeToSmall = this.largeToSmall();
    const smallToLarge = this.smallToLarge();

    if (largeToSmall.steps < smallToLarge.steps) {
      return largeToSmall;
    } else if (smallToLarge.steps < largeToSmall.steps) {
      return smallToLarge;
    } else if (smallToLarge.steps === largeToSmall.steps) {
      return { result: `Tie. Both directions completed the challenge in ${largeToSmall.steps} steps`}
    }

    // If there is condition that results in neither a tie nor a winner return an error.

    return new Error('An unkown error occured');

  }

}

const game = new WaterBuckets(3, 5, 4);

console.log(game.run());

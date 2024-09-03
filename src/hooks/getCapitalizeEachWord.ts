/**
 * Copy
 * @param {string} param, ex: 'Hello world'
 */

export const getCapitalizeEachWord = (data: string) => {
  const arr = data.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  const newString: string = arr.join(' ');

  return newString;
};

/*
Copyright (c) 2011 Andrei Mackenzie
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var getEditDistance = function(a, b){
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

var checkSimilarity = function(a, b)
{
  var a_words = a.split(" ");
  var b_words = b.split(" ");
  var dist = 0;
  var temp, min;
  for (var i=0; i < a_words.length; i++)
  {
    min = 100
    for (var j=0;  j < b_words.length; j++) {
      temp = getEditDistance(a_words[i], b_words[j]);
      temp /= (a_words[i].length + b_words[i].length)
      if (temp < min)
        min = temp
    }
    dist += min
  }
  return dist;
};

var getSimilar = function(a, strings)
{
  var min = 0.9 //THRESHOLD
  var id = -1
  for (var i=0; i< strings.length; i++)
  {
    var temp = checkSimilarity(a, strings[i].name)
    if (temp<min)
    {
      min = temp;
      id = i;
    }
  }
  if (id == - 1)
    return -1;
  return strings[id];
}

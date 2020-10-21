// for loop
// for(var i=0;i<10;i++){

// }

// khoi tao-> kiem tra dieu kien-> thuc thi-> thay doi step-> kiem tra dieu kien - >thuc thi-> thay doi step
// optimize: minimize the number of object members and array item lookups.

function print(r) {
  console.log(r);
}
const t = [1, 2, 3, 4, 5, 6];
for (var i = 0; i < t.length; i++) {
  print(t[i]);
}

//  minimizing property lookups
for (var i = 0, len = t.length; i < len; i++) {
  print(t[i]);
}

// minimizing property lookups and reversing
for (var i = items.length; i--; ) {
  process(items[i]);
}

// tương tự cho các loại loop khác
// CHÚ Ý KHÔNG SỬ DỤNG " for in "
// https://medium.com/free-code-camp/how-to-optimize-your-javascript-apps-using-loops-d5eade9ba89f

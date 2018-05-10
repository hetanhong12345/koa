/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    if (!l1 || l1.val == 0) {
        return l2
    }
    if (!l2 || l2.val == 0) {
        return l1;
    }
    let head1 = l1;
    let head2 = l2;
    let head = new ListNode(0);
    let temp = head;
    let add = 0;
    while (head1 && head2) {
        let result = head1.val + head2.val + add;
        if (result >= 10) {
            temp.val = result - 10;
            add = 1;
        }
        else {
            temp.val = result;
            add = 0;
        }
        console.log(temp)
        if (head1.next && head2.next) {
            head1 = head1.next;
            head2 = head2.next;
            temp.next = new ListNode(0);
            temp = temp.next;
        } else {
            break
        }


    }
    console.log(add);
    if (!head1.next && !head2.next) {
        if (add == 1) {
            console.log('bbb');
            temp.next = new ListNode(1);
        }
        return head
    }
    if (head1.next) {
        temp.next = head1.next;
    }
    if (head2.next) {
        temp.next = head2.next;
    }
    if (add == 0) {
        return head;
    }

    temp = temp.next;
    console.log(temp, add, '--->');

    while (temp.val + add >= 10) {
        if (temp.next) {
            temp.val = 0;
            temp = temp.next;
            add = 1;
        } else {
            temp.val = 0;
            temp.next = new ListNode(1)
            add = 0;
            return head

        }


    }
    temp.val += add;
    return head;

};

function ListNode(val) {
    this.val = val;
    this.next = null;

};
var l1 = new ListNode(1);


var l2 = new ListNode(9);
l2.next = new ListNode(8);
console.log(addTwoNumbers(l1, l2));


var lengthOfLongestSubstring = function (s) {
    let map = {};
    let arr = [1];
    if (!s) {
        return 0;
    }

    let len = s.length;
    if (len <= 1) {
        return 1;
    }
    map[s[0]] = 0;
    let max = 1;

    for (let i = 1; i < len; i++) {
        let ch = s[i];
        let temp = arr[arr.length - 1];

        if (map[ch] == null) {
            map[ch] = i;
            arr.push(temp + 1)

        }
        else {

            if (i - map[ch] >= temp) {
                arr.push(temp + 1)
            } else {
                arr.push(i - map[ch])
            }
            map[ch] = i;
        }
        if (arr[arr.length - 1] > max) {
            max = arr[arr.length - 1];
        }
    }
    return max;

};

lengthOfLongestSubstring('abcbbdac');


var isPalindrome = function (x) {
    if (!x) {
        return true;
    }
    x = x.toString();
    let len = x.length;
    for (let i = 0; i < (len - 1) / 2 + 1; i++) {
        if (x[i] != x[len - 1 - i]) {
            return false;
        }
    }

    return true;

};
isPalindrome(-121)
var maxArea = function (heights) {
    let max = 0;
    let len = heights.length;
    if (len <= 1) {
        return max;
    }

    function areaIndex(index) {
        let max = 0;
        let min = heights[index];
        for (let i = index - 1; i >= 0; i--) {
            let distance = Math.min(min, heights[i]);

            let area = (index - i) * distance;
            if (area > max) {
                max = area;
            }
        }
        return max;


    }

    let maxIndex = 0;
    for (let i = 1; i < len; i++) {

        if (heights[i] > max) {
            max = heights[i];
            maxIndex = i;
        }
    }
    if (maxIndex < heights.length / 2) {
        maxIndex = heights.length - 1 - maxIndex;
        heights = heights.reverse();
    }
    max = 0;

    for (let i = maxIndex; i < len; i++) {

        if (areaIndex(i) > max) {
            max = areaIndex(i)
        }
    }

    return max;

};
console.log(maxArea([1, 1]));
var isValid = function (s) {
    if (!s) {
        return true;
    }
    if (s.length % 2 === 1) {
        return false;
    }

    let tempStr = s.replace(/\[\]/g, '').replace(/\{\}/g, '').replace(/\(\)/g, '');
    if (tempStr.length === s.length) {
        return false;
    }
    return isValid(tempStr);


};
isValid('[()]')


var digMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
}

var letterCombinations = function (digits) {
    if (!digits) {
        return [];
    }
    if (digits.length == 1) {
        return [...digMap[digits]]
    }

    let lastDigit = digits[digits.length - 1];
    let result = [];
    for (let dig of digMap[lastDigit]) {
        result = result.concat(letterCombinations(digits.slice(0, -1)).map(el => el + dig))
    }
    return result

};

console.log(letterCombinations('23456'));


var searchRange = function (nums = [], target) {
    let result = [-1, -1];
    if (nums.length == 0) {
        return result;
    }
    if (target < nums[0] || target > nums[nums.length - 1]) {
        return result;
    }

    let l = 0, r = nums.length, m = Math.floor((l + r) / 2);
    let find = false;
    while (l < r) {
        if (target == nums[m]) {
            find = true;
            break;
        }
        if (nums[m] < target) {
            l = m;
        }
        if (nums[m] > target) {
            r = m;
        }
        m = Math.floor((l + r) / 2)
    }
    if (!find) {
        return result;
    }
    l = m;
    r = m;
    while (l >= 0 && nums[l] == target) {
        l--;
    }
    while (r < nums.length && nums[r] == target) {
        r++;
    }
    return [l + 1, r - 1];


};

searchRange([1, 2, 3, 4, 5, 6, 6, 7, 8], 6)


var maximalRectangle = function (matrix) {
    var len = matrix.length;
    if (!len) {
        return 0;
    }
    let subLen = matrix[0].length;
    if (!subLen) {
        return 0;
    }
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < subLen; j++) {
            matrix[i][j] = parseInt(matrix[i][j]);
            if (matrix[i][j] == 1 && (i > 0)) {
                matrix[i][j] = (matrix[i - 1][j]) + 1;
            }
        }
    }
    let maxArea = 0;
    for (let i = 0; i < len; i++) {
        let area = rectArea(matrix[i]);
        maxArea = Math.max(area, maxArea);
    }
    return maxArea;

};

function rectArea(arr) {
    var maxArea = 0, tpIndex = 0, i = 0;
    var stack = [];
    var len = arr.length;
    while (i < len) {
        if (stack.length == 0 || arr[i] >= arr[stack[stack.length - 1]]) {
            stack.push(i++);
        } else {
            tpIndex = stack.pop();
            let area = arr[tpIndex] * (stack.length == 0 ? i : i - stack[stack.length - 1] - 1);
            maxArea = Math.max(area, maxArea);
        }
    }

    while (stack.length) {
        tpIndex = stack.pop();
        let area = arr[tpIndex] * (stack.length == 0 ? i : i - stack[stack.length - 1] - 1);
        maxArea = Math.max(area, maxArea);
    }
    return maxArea;


}

var matrix = [
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"]
];
console.log('---->', maximalRectangle(matrix));

function wordBreak(s = '', wordDict = []) {
    if (s.length == 0) {
        return true;
    }
    if (wordDict.length == 0) {
        return false;
    }
    let dp = [true];
    for (let i = 1; i <= s.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (dp[j]) {
                let word = s.substr(j, i - j);
                if (wordDict.indexOf(word) != -1) {
                    dp[i] = true;
                    break;
                }
            }
        }
    }
    console.log(dp);

    return !!dp[s.length];
}


console.log(wordBreak('leetcode', ["leet", "code"]));


var largestIsland = function (grid) {
    let len = grid.length;
    if (!len) {
        return 0;
    }
    var xy = [];
    for (let i = 0; i < len; i++) {
        xy.push([]);
    }
    var arr = [];
    let max = 0;
    let color = 1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (grid[i][j] == 1 && !xy[i][j]) {
                arr = [];
                let value = deep(i, j, color++);
                if (value > max) {
                    max = value;
                }
                spread(arr, value)
            }
        }
    }

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (grid[i][j] == 0) {
                let value = 1;
                let colors = {};
                if (i > 0 && grid[i - 1][j]) {
                    value += grid[i - 1][j];
                    colors[xy[i - 1][j]] = true;
                }
                if (i < len - 1 && grid[i + 1][j]) {
                    if (!colors[xy[i + 1][j]]) {
                        value += grid[i + 1][j];

                        colors[xy[i + 1][j]] = true;
                    }
                }
                if (j > 0 && grid[i][j - 1]) {
                    if (!colors[xy[i][j - 1]]) {
                        value += grid[i][j - 1];
                        colors[xy[i][j - 1]] = true;
                    }

                }
                if (j < len - 1 && grid[i][j + 1]) {
                    if (!colors[xy[i][j + 1]]) {
                        value += grid[i][j + 1];
                        colors[xy[i][j + 1]] = true;
                    }

                }
                if (value > max) {
                    max = value;
                }

            }
        }
    }
    return max;

    function spread(arr, value) {
        for (let ij of arr) {
            grid[ij['x']][ij['y']] = value;
        }
    }

    function deep(x, y, color) {
        if (x < 0 || y < 0 || x >= len || y >= len) {
            return 0;
        }
        if (grid[x][y] == 0) {
            return 0;
        }

        if (xy[x][y]) {
            return 0;
        }
        xy[x][y] = color;
        arr.push({x, y});
        return 1 + deep(x - 1, y, color) + deep(x + 1, y, color) + deep(x, y - 1, color) + deep(x, y + 1, color);
    }

};

console.log(largestIsland([[1, 0, 0], [1, 0, 1], [0, 1, 1]]));

var maxProduct = function (nums = []) {
    let len = nums.length;
    if (len === 0) {
        return 0
    }
    if (len == 1) {
        return nums[0];
    }
    let max = nums[0];

    let preL = nums[0], preR = nums[0]
    for (let i = 1; i < len; i++) {
        let l = Math.min(nums[i], nums[i] * preL, nums[i] * preR);
        let r = Math.max(nums[i], nums[i] * preL, nums[i] * preR);
        preL = l;
        preR = r;

        if (r > max) {
            max = r;
        }
    }
    // console.log('max===', max);
    // console.log('result===', result);
    return max;

};
maxProduct([0, 3]);

var rob = function (nums) {


    let len = nums.length;
    if (len === 0) {
        return 0;
    }

    if (len <= 3) {
        return Math.max(...nums);
    }
    return Math.max(getMax(nums.slice(0, -1)), getMax(nums.slice(1)))

    function getMax(nums) {
        let len = nums.length;
        if (len === 0) {
            return 0;
        }
        let max = nums[0];
        if (len < 3) {
            return Math.max(...nums);
        }

        nums[2] = nums[2] + nums[0];
        if (len == 3) {
            return Math.max(...nums);
        }
        max = Math.max(nums[2], max);
        for (let i = 3; i < len; i++) {
            nums[i] += Math.max(nums[i - 2], nums[i - 3]);
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        //console.log('rob max===', max);
        return max;
    }
};
rob([2, 7, 9, 3, 1]);


var maximalSquare = function (matrix) {
    let len = matrix.length;
    if (len == 0) {
        return 0
    }
    let subLen = matrix[0].length;
    if (subLen == 0) {
        return 0;
    }
    let max = 0;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < subLen; j++) {
            if (matrix[i][j] == 1) {
                max = Math.max(1, max);
                if (i >= 1 && j >= 1) {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
                    if (matrix[i][j] > max) {
                        max = matrix[i][j];
                    }
                }
            }

        }
    }
    return max * max;

};
maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]])


var largeGroupPositions = function (S) {
    let result = [];
    let len = S.length;
    let char = S[0], index = 0, max = 1;
    for (let i = 1; i < len; i++) {
        if (S[i] === char) {
            max++;
            // last char
            if (i === len - 1) {
                if (max >= 3) {
                    result.push([index, i]);
                }
            }
        } else {
            if (max >= 3) {
                result.push([index, i - 1]);
            }
            index = i;
            char = S[i];
            max = 1;
        }

    }
    console.log('result===', result);
    return result;

};
largeGroupPositions('abbbcdddeeee');


var numberOfLines = function (widths, S) {
    let line = 1, units, sum = 0;
    for (let char of S) {
        let index = char.charCodeAt(0) - 97;
        let all = sum + widths[index];
        if (all === 100) {
            sum = 0;
            line++;
            continue;
        }
        if (all > 100) {
            sum = widths[index];
            line++;
            continue;
        }
        sum = all;

    }
    units = sum;
    return [line, units];

};
numberOfLines([4, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 'bbbcccdddaaa');

var uniqueMorseRepresentations = function (words) {
    let translates = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."]
    let results = [];
    for (let word of words) {
        let strArr = word.split('');
        strArr = strArr.map(el => translates[el.charCodeAt(0) - 97]);
        console.log(strArr);
        let str = strArr.join('');
        if (results.includes(str)) {
            continue;
        }
        results.push(str);

    }
    return results.length;
};

uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]);


var maxIncreaseKeepingSkyline = function (grid) {
    let len = grid.length;
    let oringal = 0;
    let resultGrid = [];
    for (let i = 0; i < len; i++) {
        resultGrid.push(new Array(len).fill(0));
    }
    let skylines = [], maxLeft = [], maxTop = [];
    let maxObj = {}
    for (let i = 0; i < len; i++) {
        maxObj = {
            val: grid[i][0],
            x: i,
            y: 0
        }
        for (let j = 0; j < len; j++) {
            oringal += grid[i][j];
            if (grid[i][j] > maxObj.val) {
                maxObj = {
                    val: grid[i][j],
                    x: i,
                    y: j
                }
            }

        }
        if (!resultGrid[maxObj.x][maxObj.y]) {
            skylines.push(maxObj);
        }
        resultGrid[maxObj.x][maxObj.y] = maxObj.val;
        maxLeft[i] = maxObj.val;
    }

    for (let i = 0; i < len; i++) {
        maxObj = {
            val: grid[0][i],
            x: 0,
            y: i
        }
        for (let j = 0; j < len; j++) {

            if (grid[j][i] > maxObj.val) {
                maxObj = {
                    val: grid[j][i],
                    x: j,
                    y: i
                }
            }

        }
        if (!resultGrid[maxObj.x][maxObj.y]) {
            skylines.push(maxObj);
        }
        resultGrid[maxObj.x][maxObj.y] = maxObj.val;
        maxTop[i] = maxObj.val;
    }

    skylines.sort((a, b) => {
        return a.val > b.val ? 1 : -1;
    });
    skylines.map(el => {
        let {val, x, y} = el;
        if (maxLeft[x] === val) {
            fillX(resultGrid, x, val);
        }
        if (maxTop[y] === val) {
            fillY(resultGrid, y, val);
        }
    });

    function fillX(Grid, x, val) {
        for (let i = 0; i < len; i++) {
            if (Grid[x][i] === 0) {
                Grid[x][i] = val
            }
        }
    }

    function fillY(Grid, y, val) {
        for (let i = 0; i < len; i++) {
            if (Grid[i][y] === 0) {
                Grid[i][y] = val
            }
        }
    }

    /*console.log(skylines);
    console.log(maxLeft);
    console.log(maxTop);
    console.log(resultGrid);*/
    let result = 0;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            result += resultGrid[i][j];
        }
    }
    return result - oringal;
};
maxIncreaseKeepingSkyline([[3, 0, 8, 4], [2, 4, 5, 7], [9, 2, 6, 3], [0, 3, 1, 0]])


var splitArraySameAverage = function (A) {
    let sum = 0, avg, len = A.length, distance = 0.00001;
    for (let num of A) {
        sum += num;
    }
    avg = sum / len;
    let avgs = [{
        val: A[0],
        total: 1
    }]
    for (let i = 1; i < len - 1; i++) {
        if (Math.abs(A[i] - avg) <= distance) {
            return true;
        }
        let tempAvgs = [];
        if (isNotIn(A[i], 1)) {
            tempAvgs.push({
                val: A[i],
                total: 1
            });
        }
        let avs =[...avgs]
        for (let avgObj of avs) {
            let tempSum = A[i] + avgObj.val;
            let tempAvg = tempSum / (avgObj.total + 1);
            if (Math.abs(tempAvg - avg) <= distance) {
                return true;
            }
            if (isNotIn(tempSum, avgObj.total + 1)) {
                avgs.push({
                    val: tempSum,
                    total: avgObj.total + 1
                });
            }

        }
    }
    return false;

    function isNotIn(val, total) {
        if (total > Math.ceil(len / 2)) {
            return false;
        }
        for (let avg of avgs) {
            if (avg.val == val && avg.total == total) {
                return false;
            }
        }
        return true;
    }

};

console.log(splitArraySameAverage([3863, 703, 1799, 327, 3682, 4330, 3388, 6187, 5330, 6572, 938, 6842, 678, 9837, 8256, 6886, 2204, 5262, 6643, 829, 745, 8755, 3549, 6627]))


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
let addTwoNumbers = function (l1, l2) {
    if (!l1 || l1.val === 0) {
        return l2
    }
    if (!l2 || l2.val === 0) {
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
        console.log(temp);
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
        if (add === 1) {
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
    if (add === 0) {
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
            temp.next = new ListNode(1);
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

}
let l1 = new ListNode(1);


let l2 = new ListNode(9);
l2.next = new ListNode(8);
console.log(addTwoNumbers(l1, l2));


let lengthOfLongestSubstring = function (s) {
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


let isPalindrome = function (x) {
    if (!x) {
        return true;
    }
    x = x.toString();
    let len = x.length;
    for (let i = 0; i < (len - 1) / 2 + 1; i++) {
        if (x[i] !== x[len - 1 - i]) {
            return false;
        }
    }

    return true;

};
isPalindrome(-121);
let maxArea = function (heights) {
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
let isValid = function (s) {
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
isValid('[()]');


const digMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
};

let letterCombinations = function (digits) {
    if (!digits) {
        return [];
    }
    if (digits.length === 1) {
        return [...digMap[digits]];
    }

    let lastDigit = digits[digits.length - 1];
    let result = [];
    for (let dig of digMap[lastDigit]) {
        result = result.concat(letterCombinations(digits.slice(0, -1)).map(el => el + dig))
    }
    return result

};

console.log(letterCombinations('23456'));


let searchRange = function (nums = [], target) {
    let result = [-1, -1];
    if (nums.length === 0) {
        return result;
    }
    if (target < nums[0] || target > nums[nums.length - 1]) {
        return result;
    }

    let l = 0, r = nums.length, m = Math.floor((l + r) / 2);
    let find = false;
    while (l < r) {
        if (target === nums[m]) {
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
    while (l >= 0 && nums[l] === target) {
        l--;
    }
    while (r < nums.length && nums[r] === target) {
        r++;
    }
    return [l + 1, r - 1];


};

searchRange([1, 2, 3, 4, 5, 6, 6, 7, 8], 6);

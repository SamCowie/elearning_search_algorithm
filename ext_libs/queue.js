/*The MIT License (MIT)

Copyright (c) 2013 Tim Caswell <tim@creationix.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

function Queue() {
  this.head = [];
  this.tail = [];
  this.index = 0;
  this.headLength = 0;
  this.length = 0;
}

// Get an item from the front of the queue.
Queue.prototype.shift = function () {
  if (this.index >= this.headLength) {
    // When the head is empty, swap it with the tail to get fresh items.
    var t = this.head;
    t.length = 0;
    this.head = this.tail;
    this.tail = t;
    this.index = 0;
    this.headLength = this.head.length;
    if (!this.headLength) {
      return;
    }
  }

  // There was an item in the head, let's pull it out.
  var value = this.head[this.index];
  // And remove it from the head
  if (this.index < 0) {
    delete this.head[this.index++];
  }
  else {
    this.head[this.index++] = undefined;
  }
  this.length--;
  return value;
};

// Insert a new item at the front of the queue.
Queue.prototype.unshift = function (item) {
  this.head[--this.index] = item;
  this.length++;
  return this;
};

// Push a new item on the end of the queue.
Queue.prototype.push = function (item) {
  // Pushes always go to the write-only tail
  this.length++;
  this.tail.push(item);
  return this;
};

/*
var q = new Queue;
q.push(1);
q.push(2);
q.push(3);
var i = 4;
while (q.length > 0) {
  console.log(q.length, q.shift());
  q.unshift(i++);
  console.log(q.length, q.shift());
  q.push(i++);
  console.log(q.length, q.shift());
}
*/
# repoll

simple poll server for hack

## Demo

* open master page
* [client page](http://repoll.herokuapp.com/)
* select button on client page and enjoy chnages on master page!!

## socket.io events

```
            1.master_ready
              (char info)         2.master_ready
 +-----------+          +----------+          +---------+
 | reveal.js | -------> |  repoll  | -------> |         |
 |  (master) |          |  server  |          | clients |
 |           | <------- | (heroku) | <------- |         |
 +-----------+          +----------+          +---------+
           4.client_vote           3.client_vote
```

### master_ready event data

send pie chart data to server. server will automatically fire to connected clients with received data.

```
[
  {
    value : 0,
    color : "#F38630",
    desc : "java"
  },
  {
    value : 0,
    color : "#E0E4CC",
    desc : "javascript"
  },
  {
    value : 0,
    color : "#69D2E7",
    desc : "ruby"
  }
]
```

### client_vote event data

send selected index to server

```
{
    selected:index
}
```
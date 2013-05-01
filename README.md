# repoll

simple poll server for hack

## socket.io events

```
            1.master_ready
              (char info)      2.master_ready
 +-----------+          +--------+          +---------+
 | reveal.js | -------> | repoll | -------> | clients |
 |  (master) | <------- | server | <------- |         |
 +-----------+          +--------+          +---------+
           4.client_vote         3.client_vote
```

### master_ready

send chart data to server & to client

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

### client_vote

send selected index to server

```
{
    selected:index
}
```
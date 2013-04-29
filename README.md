# repoll

simple poll server for reveal.js

## socket.io events

```
            1.master_ready
              (char info)      2.master_ready
 +-----------+          +--------+          +---------+
 | reveal.js | -------> | repoll | -------> | clients |
 |  (master) | <------- | server | <------- |         |
 +-----------+          +--------+          +---------+
           4.client_intent      3.client_vote
```


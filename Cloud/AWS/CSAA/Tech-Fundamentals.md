# Tech Fundamentals

## YAML Ain't Markup Language (YAML)

YAML = Human-readable data-serialization language for all programming languages.

* YAML files can be read into or written out by an application and are commonly used for configuration.
* A YAML document is an unordered collection of key/value pairs, where each key has a value.
* Indentation matters in YAML, the same level means the same list.

### Sequences or Lists

* Comma-separated elements enclosed with brackets `[ ]`, this format is known as inline.
* The same list is separated on each line.
* Both patterns are valid, but enclosing can be more precise.

```yaml
list1: ["Bob", "Jen", "Time"]

list2:
  - "Bob"
  - "Jen"
  - "Tim"
```

### Dictionary (Structure)

* Three items with one or more key/value pairs.

```yaml
people:
  - last: Fornal
    first: Bob
  - last: [Fornal, Manno]
    first: Jen
  - last: Fornal
    first: Tim
    car: Bullet
```

### CloudFormation

* This YAML template has a `Resources` section (a dictionary).
* `s3bucket` is a dictionary that containes `Type` and `Properties` keys.
* `Type` has a string value.
* `Properties` is a dictionary containing `BucketName`.
* `BucketName` is a key with a string value.

```yaml
Resources:
  s3bucket:
    Type: "AWS::S3::Bucket"
    Properties:
      BucketName: "ac1337peoplepictures"
```

## JavaScript Object Notation (JSON)

JSON (JavaScript Object Notation) is a lightweight data-interchange format.

* It is easy for humans to read and write.
* It is easy for machines to parse and generate.

An **object** is an unordered set of key/value pairs enclosed by `{ }`.

```json
{ "lastname": "Fornal", "firstname": "Bob" }
```

An **array** is an ordered collection of values, separated by commas and enclosed in `[ ]`.

* The top-level is a collection of unordered key/value pairs where the value is a JSON object.
* Each nested object is a collection of key/value pairs where the value can be a scalar, a list, or a JSON object.

### CloudFormation

This object references the same S3 Bucket as the example above in YAML.

* This JSON template has a `Resources` key, its value is a JSON object.
* `s3bucket` is a JSON object that contains `Type` and `Properties` keys.
* `Type` has a string value.
* `Properties` is a JSON object containing `BucketName`.
* `BucketName` is a key with a string value.

```json
{
  "Resources": {
    "s3bucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "BucketName": "ac1337peoplepictures" 
      }
    }
  }
}
```

## Networking Starter Pack

### OSI 7-Layer Model

[Documentation](https://en.wikipedia.org/wiki/OSI_model)

The software that does each of these functions is called the networking stack.

* Media Layers: Physical, Data Link, Network.
* Host Layers: Transport, Session, Presentation, Application.

| Layer | Function |
|-------|----------|
| 7 | Application |
| 6 | Presentation |
| 5 | Session |
| 4 | Transport |
| 3 | Network |
| 2 | Data Link |
| 1 | Physical |

### Layer 1 - Physical

Layer 1 (Physical) specifications defined the transmission and reception of **raw bitstreams** between a device and a **shared physical medium**. It defines things like voltage levels, timing, rates, distances, modulation, and connectors.

* Physical Medium can be Copper (electrical), Fiber (light), or WIFI (RF).
* HUB = Anything received on any port is transmitted on every other port (including errors and collisions).

Notes ...

* There is no device addressing, all data is processed by all devices.
* If multiple devices transmit at once, a collision occurs.
* Layer 1 has no media access control and no collision detection.

Detail ...

* Physical shared medium.
* Standards for transmitting onto the medium.
* Standards for receiving from the medium.
* No access control.
* No uniquely identifiable devices.
* No device-to-device communication.

### Layer 2 - Data Link

CSMA = Carrier Sense Multiple Access.

Devices at L2 have unique hardware (MAC) addresses. It is 48-bits, in hex, 24-bits for manufacturer information. Frames can be addressed to a destination or broadcast (all Fs).

* L1 sends and receives the information.

The frame is a container of sorts and is made up of ...

* PREAMBLE, 56-bits (SFD 8-bits) (start of the frame).
* Destination Mac Address.
* Source Mac Address.
* Ether Type 16-bits (L3 Information).
* Payload 46 to 1,500-bytes (encapsulated or extracted).
* FCS 32-bits, Frame Check Sequence (CRC Check).

The "PAYLOAD" is the data the frame carries from source to destination. It is generally provided by Layer 3. And the "Ether Type (ET)" attribute defines **which** L3 protocol is used (example, IP).

Anything sent using L1 will be immediately transmitted on the physical medium. **There is no media access control**.

* This can cause **physical corruption** of the signal (voltage, light, or RF) caused by overlap.

Process ...

1. One side uses L2, intending to send data to the other device. L2 creates a Frame (F1).
2. L2 Checks for a Carrier Signal.
3. If there is NO carrier, L2 takes the frame data (F1), converts it to physical standard and **transmits**.
4. The other side's L1 receives and passes the Frame (F1) to L2.
5. When the other side needs to send, its L2 builds a Frame (F2).
6. L2 Checks for a Carrier Signal. If detected, it waits while transmitting.
7. Frame (F2) sent to L1 for transmission.
8. The original side's L1 receives and passes the Frame (F1) to L2.
9. If collisions are detected (both transmitting at once) both backoff for a time (random). This backoff increases if there is another collision.

Switches ...

* Switches understand Frames and Mac Addresses.
* They maintain a Mac Address Table which starts empty. As the switch receives Frames on its ports, it learns which devices are connected and populates the Mac Address Table.
* Switches are intelligent. If a Frame is transmitted to an address, it will be forwarded to that one specific port. If not, it will be forwarded to all ports.
* Any Frames with "all Fs" will always be forwarded to all ports.
* Switches store and forward, they do not repeat blindly like hubs. It means that only valid Frames are forwarded and collisions are isolated on the port they occurred.
* Every X-port switch has X collision domains. This allows switches to scale and be connected.

Detail ...

* Identifiable devices.
* Media Access Control (sharing).
* Collision detection.
* Unicast 1:1.
* Broadcast 1:ALL.
* Switches, like hubs with "Super Powers" (Layer 2).

### Decimal to Binary Conversion

For IPv4 Addressing ...

| Human | 133.33.33.7 | Dotted Decimal Notation |
|-------|-------------|-------------------------|
| Computer | 1000 0101.0010 0001.0010 0001.0000 0111 | Binary |

32-bits = 4 x 8-bits, 4 x Bytes, 4 x Octets.

| Position | 1 | 2 | 3 | 4 | GAP | 5 | 6 | 7 | 8 | Sum |
|----------|---|---|---|---|-----|---|---|---|---|-----|
| Binary Position Value | 128 | 64 | 32 | 16 | | 8 | 4 | 2 | 1 | |
| | 1 | 1 | 1 | 1 | | 1 | 1 | 1 | 1 | 255 |
| | 0 | 0 | 0 | 0 | | 0 | 0 | 0 | 0 | 0 |
| | 1 | 0 | 0 | 0 | | 0 | 1 | 0 | 1 | 133 |
| | 0 | 0 | 1 | 0 | | 0 | 0 | 0 | 1 | 33 |
| | 0 | 0 | 0 | 0 | | 0 | 1 | 1 | 1 | 33 |

Move through the binary table from left to right ...

1. Compare the decimal number to the binary position value, if SMALLER then enter 0.
2. Move to the next table position and go to 1, else 3.
3. If it is equal or larger, subtract the binary position value from the decimal number. Enter 1.
4. Move to the next table position and go to 1 (with the new decimal number).

### Layer 3 - Network

Example: LAN1 and LAN2 are isolated local area networks. Using only Layer 2, only those networks joined by a direct point-to-point link using the *same* Layer 2 Protocol could communicate.

* Ethernet is an L2 Protocol used generally for local networks. Long-distance point-to-point links will use other, more suitable protocols such as ... PPP, MPLS, ATM.

The Internet Protocol (IP) is a Layer 3 Protocol that adds cross-network IP addressing and routing to move data between Local Area Networks without direct P2P links.

* IP Packets are moved step-by-step from source to destination via intermediate networks, encapsulated in different Frames along the way.
* Routers, L3 devices, remove Frame encapsulation and add new Frame encapsulation at every hop.

Internet Protocol, important ...

| IPv4 | IPv6 |
|------|------|
| Protocol |  |
| Time-to-Live | Hop Limit |
| Source IP Address | Source IP Address (larger) |
| Destination IP Address | Destination IP Address (larger) |
| Data (generally from Layer 4) | Data (generally from Layer 4) |

#### IP Addressing (v4) - IPv4

`133.33.3.7` is Dotted-Decimal Notation (4 x 0-255 x 8-bits, octets).

* All IP Addresses have a **network** and a **host** part.
* If the **network** part of two IP addresses matches, it means they are on the same IP network. If not, they are on different networks.
* The `/n` prefix indicates the number of bits of the IP address that are the network. The remaining bits are for the hosts.
* IP Addresses are assigned by machine (DHCP) or by humans.

#### Subnet Mask

The **Subnet Mask** allows a host to determine if an IP address it needs to communicate with is local or remote. This influences if it needs to use a gateway or can communicate locally.

* A subnet mask is configured on a host device in addition to an IP address (example, `255.255.0.0` and this is the same as a `/16` prefix).
* A subnet mask is a dotted-decimal version of a binary number that indicates which part of an IP Address is a network (1) and which part is a host (0).
* The starting address of the local network is all 0s in the host part and the ending is all 1s in the host part.

Address: `133.33.3.7`, Subnet Mask: `255.255.0.0` or `/16` ...

|         | `133`     | `33`      | `3`       | `7`       |
|---------|-----------|-----------|-----------|-----------|
| Address | 1000 0101 | 0010 0001 | 0000 0011 | 0000 0111 |
| Mask    | 1111 1111 | 1111 1111 | 0000 0000 | 0000 0000 |

#### Route Tables and Routes

Packets are routed, hop-by-hop across the internet from source to destination.

1. Default route `0.0.0.0/0` sends all packets to ISP.
2. ISP Router has multiple interfaces. The Route Table is used for selection.
3. Router compares packet destination IP and Route Table for matching destinations. The more specific prefixes are preferred (0 lowest, 32 highest). The packet is forwarded to the **next-hop/target**.

#### Address Resolution Protocol (ARP)

ARP runs between L2 and L3.

Within a local network, data is moved via L2 Frames over L1. ARP discovers which MAC relates to a given IP.

* L2 Broadcasts to all Fs. Who has the address I am looking for?

When handling addresses outside the local network ...

1. Subnet mask and destination IP show it isn't a local address.
2. ARP is used to find the MAC address of the Default Gateway.
3. Packet with destination MAC address from Step 2.
4. Gateway Router removes the Frame and reviews the IP destination.
5. Gateway Router has a route for the next network. It creates a Frame with the next Router (the next IP hop) as the destination MAC. The payload is unchanged and is in the Frame payload.
6. Frame sent to the next Router.
7. Next Router removes the Frame from the packet.
8. Next Router confirms the destination IP address on the same network and uses ARP to get the MAC address of the device. It creates a Frame with the new destination MAC and encapsulates the packet.
9. The Frame is sent to the packet's final destination.

Network Layer adds ...

* IP Addresses (IPv4 or iPv6) - **cross-network addressing**.
* **ARP** - finds the MAC address for an IP.
* **Route** - where to forward a packet.
* **Route** Tables - Multiple Routes.
* **Router** - moves packets from Source to Destination - encapsulating in L2 on the way.
* **Device-to-device** communication over the Internet.
* **NO** Method for **channels** of communications, Source IP to Destination IP Only.
* **Packets can be delivered out of order**.

### Layer 4 - Transport

Layer 3 Problems ...

Each Packet is routed independently.

* Routing decisions are done "per packet." Different routes could result in **out of order packets** when they arrive at the destination. L3 provides no mechanism for ordering.
* Layer 3 communication is not guaranteed to be reliable. Packets can be lost en route.
* Per packet routing can introduce delays to packets en route. Difference packets can experience different delays.
* With Layer 3, there are no communication channels. Packets have a Source and Destination IP but no method of splitting by Application or Channel.
* There is no flow control. If the source transmits faster than the destination can receive it can saturate the destination causing packet loss.

Layer 4 - TCP and USP ...

> I'd tell you a UDP joke, but you might not get it. #DadJoke

* Layer 4 - TCP (Slower protocol, reliable)
* Layer 4 - UDP (Faster protocol, less reliable)
* Layer 3 - Network
* Layer 2 - Data Link
* Layer 1 - Physical

#### Transmission Control Protocol (TCP)

TCP is a connection-based protocol. A connection is established between two devices using a random port on a client and a known port on the server. Once established the connection is bi-directional. The "connection" is a reliable connection, provided via the segments encapsulated in the IP Packets.

* Layer 3 Packets provide no error checking, ordering, or association.
* Segments are linked to a connection, providing error checking, ordering, and retransmission.

TCP Ports ...

* Server, tcp/443 (Well-Known Port).
* Client, tcp/23060 (random higher number, Ephemeral Port).

TCP Segments ...

* TCP Segments are encapsulated within IP Packets.
* Segments **do not have Source and Destination IPs**, the packets provide device addressing.

TCP Header ...

* Source Port and Destination Port.
* Sequence Number (for ordering and error correction).
* Acknowledgements (both sides can be used to make observations about the packet).
* Flags 'n' Things (*) ... flags plus extra fields.
* Window (number of bytes the receiver is willing to receive between Acknowledgements).
* Checksum.
* Urgent Pointer (control traffic).
* Options and Padding.

TCP Connection - 3-Way Handshake ...

Flags can be set to alter the connection.

* **FIN** can be used to close the connection.
* **ACK** for acknowledgements.
* **SYN** to synchronise the sequence number.

1. `SYN`, Client sends a segment with SYN sequence setting `Client Sequence Number (CS)` to a random value.
2. `SYN-ACK`, Increments `CS` = CS + 1. The server then picks a random sequence number `Server Sequence NUmber (SS)`. It then sends a Segment - `SYN` and `ACK` with the sequence number set to `SS` and acknowledge set to `CS + 1`.
3. `ACK`, Client increments `SS` = SS + 1 and `CS` = CS + 2. It then sends a Segment with `ACK`, sequence set to `CS + 2` and acknowledge set to `SS + 1`.
4. Connection Established and Client can send data.

TCP Sessions and States ...

* A **Stateless Firewall** would see two things. An Outbound connection (client to server) and a Response connection (server to client). In AWS (Network ACL), **two rules will be required, OUT and IN).
* A **Stateful Firewall** sees the traffic as one thing. An Outbound connection between the client and server. This allows the outbound traffic to implicity allow the inbound response. In AWS, this is how a Security Group works.

## Network Address Translation (NAT)

* NAT is designed to overcome the **IPv4 Address shortages**.
* NAT also provides some **security benefits**.
* Translates Private IPv4 addresses to Public Addresses.
* **Static NAT** - 1 Specific Private Address to 1 Specific (fixed) Public Address (IGW).
* **Dynamic NAT** - 1 Private Address to 1st available Public Address.
* Port Address Translation (PAT) - many Private Addresses to 1 Public Address (NATGW).
* NAT only makes sense for IPv4 ... not with IPv6.

Static Network Address Translation ...

* The Router (NAT Device) maintains a NAT table that maps Private IP to Public IP (1:1).

Dynamic Network Address Translation ...

* The Router (NAT Device) maintains a NAT table that maps Private IP to Public IP. Public IP allocations are *temporary allocations from a Public IP Pool*.

Port Address Translation (PAT) ...

* In AWS this is how the NAT Gateway (NATGW) functions, a (MANY:1) Private IP to Public IP Architecture.
* The NAT Device records the Source (Private) IP and Source Port. It replaces the source IP with the single **Public IP** and a **public source port** allocated from a pool which allows IP Overloading (many-to-one).

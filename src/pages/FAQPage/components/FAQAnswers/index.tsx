import React from 'react';
import './styles.scss'
import { FaqImg } from '../../../../assets/img';

type Props = {

}
export default function FAQAnswers(props:Props){
  return (
    <div className='answers'>
      <h2>Blockchain Fundamentals</h2>
      <ul className='answers-list'>
        <li id='anchor1'>
          <h3>What is a blockchain?</h3>
          <p>A  <a href="https://consensys.io/knowledge-base/blockchain" target='__blank'>blockchain</a> is a distributed, cryptographically-secure database structure that allows network participants to establish a trusted and immutable record of transactional data without the need for intermediaries. A blockchain can execute a variety of functions beyond transaction settlement, such as smart contracts. Smart contracts are digital agreements that are embedded in code and that can have limitless formats and conditions. Blockchains have proven themselves as superior solutions for securely coordinating data, but they are capable of much more, including tokenization, incentive design, attack-resistance, and reducing counterparty risk. The very first blockchain was the Bitcoin blockchain, 
            which itself was a culmination of over a century of <a href="https://consensys.io/blog" target='__blank'> advancements in cryptography and database technology.</a></p>
        </li>
        <li id='anchor2'>
          <h3>What is blockchain software?</h3>
          <p>Blockchain software is like any other software. The first of its kind was Bitcoin, which was released as<a href="https://consensys.io/blog" target='__blank'>open source software</a>, making it available to anyone to use or change. 
            There are a wide variety of efforts across the blockchain ecosystem to improve upon Bitcoin’s original software. Ethereum has its own open source blockchain software. Some blockchain software is proprietary and not available to the public.</p>
        </li>
        <li id='anchor3'>
          <h3>What is a blockchain database?</h3>
          <p>Historically, databases have incorporated a centralized client-server architecture, in which a sole authority controls the central server. This design means that data security, alteration, and deletion rests with a single point of failure. 
            The decentralized architecture of blockchain databases emerged as a solution for many of the weaknesses of centralized database architecture. 
            A blockchain network consists of a large number of distributed nodes––voluntary participants who must reach consensus and maintain a single transactional record together.</p>
        </li>
        <li id='anchor4'>
          <h3>What is a blockchain system?</h3>
          <p>A blockchain system refers to all the aspects and features that go into a particular blockchain, everything from the consensus algorithm to the state machine to cryptographic functions. 
            As Andreas Antonopoulus and Gavin Wood note in <a href="https://github.com/ethereumbook/ethereumbook/blob/develop/01what-is.asciidoc" target='__blank'>Mastering Ethereum</a>, there are “a huge variety of blockchains with different properties”––qualifiers “help us understand the characteristics 
            of the blockchain in question, such as open, public, decentralized, neutral, and censorship-resistant.”</p>
        </li>
        <li id='anchor5'>
          <h3>How does a blockchain work?</h3>
          <p>When a digital transaction occurs in a blockchain network, it is grouped together in a cryptographically-secure “block” with other transactions that have occurred in the same time frame. The block is then broadcast to the network. 
            A blockchain network is comprised of nodes or participants who validate and relay transaction information. The block of transactions is verified by participants called miners, who use computing power to solve a cryptographic
           puzzle and validate the block of transactions. The first miner to solve and validate the block is rewarded. Each verified block is connected to the previously verified block, creating a chain of blocks. One important 
           cryptographic underpinning of blockchains is the hash function. Hashing assigns a fixed value to a string that is inputted into the system. Blockchain hashing power results in a deterministic, quickly-computable, 
           and preimage-resistant system. Explore our knowledge base to learn more about <a href="https://consensys.io/knowledge-base/how-does-a-blockchain-work" target='__blank'>how a blockchain works</a> .</p>
        </li>
        <li id='anchor6'>
          <h3>What is a blockchain application?</h3>
          <p> <a href="https://consensys.io/blockchain-use-cases" target='__blank'>Blockchain applications</a> are comparable to conventional software applications, except they implement a decentralized architecture and cryptoeconomic systems to increase security, foster trust, tokenize assets, and design new network incentives. Here are <a href="https://consensys.io/blog" target='__blank'>over 90 Ethereum apps</a> that are currently 
            being used across the Ethereum blockchain ecosystem, from prediction markets to smart legal agreements.</p>
        </li>
        <li id='anchor7'>
          <h3>What are the benefits of blockchain technology?</h3>
          <p>Blockchain technology has a wide variety of benefits, for both global enterprises and local communities. The most commonly cited <a href="https://consensys.io/blog" target='__blank'>benefits of a blockchain</a>  are 
            trusted data coordination, attack-resistance, shared IT infrastructure, tokenization, and built-in incentivization.</p>
        </li>
        <li id='anchor8'>
          <h3>What is the blockchain revolution?</h3>
          <p>Blockchain is considered a disruptive technology because of its ability to safeguard personal information, reduce intermediaries, unlock digital assets, and potentially open up the global economy to millions more participants. Sometimes called the Trust Machine, blockchain technology is bringing transparency and security to digital networks across <a href="https://consensys.io/blockchain-use-cases" target='__blank'>countless industries</a>. 
            In many ways, the blockchain revolution can be considered a revolution in trust.</p>
        </li>
        <li id='anchor9'>
          <h3>What is decentralized finance (DeFi)?</h3>
          <p>Decentralized finance—often called DeFi or open finance—refers to the economic paradigm shift enabled by decentralized technologies, particularly blockchain networks. DeFi signals the shift from a historically centralized and closed financial system toward a universally accessible economy that is based on open protocols that are interoperable, programmable, and composable. From streamlined and secure payment networks to automated loans 
            to USD-pegged stablecoins, decentralized finance has emerged as <a href="https://consensys.io/blog/the-100-projects-pioneering-decentralized-finance" target='__blank'>one of the most active sectors in the blockchain space</a> . Some of the defining factors of a DeFi application include permissionless architecture (anyone can participate), transparent and auditable code, and interoperability with other DeFi products.
            <a href="https://defiscore.io/" target='__blank'>DeFi Score </a> offers a single, consistently comparable value for measuring DeFi platform risk.</p>
        </li>
        <li id='anchor10'>
          <h3>What is a block in a blockchain?</h3>
          <p>The “block” in a blockchain refers to a block of transactions that has been broadcast to the network. The “chain” refers to a string of these blocks. When a new block of transactions is validated by the network, it is attached to the end of an existing chain. This chain of blocks is an ever-growing ledger of transactions that the network has validated. We call this single, 
            agreed-upon history of transactions a blockchain. Only one block can exist at a given chain height. There are several ways to add new blocks to an existing chain. These are often termed “proofs,” i.e. Proof of Work (PoW), Proof of Stake (PoS), and Proof of Authority (PoA). 
            All involve cryptographic algorithms with varying degrees of complexity.</p>
        </li>
        <li id='anchor11'>
          <h3>What is block time?</h3>
          <p>Depending upon how a particular blockchain protocol was developed, the time that it takes for a block to be added to the canonical chain can vary widely. A blockchain is a linear construct in that every new block occurs at a later time than the one that preceded it and cannot be undone. A blockchain’s linearity serves as an ideal form of validation. According to <a href="https://ethstats.io/" target='__blank'>ethstats.io </a>as 
            of July 2019, for the Ethereum blockchain, new blocks are added approximately every 14 seconds.</p>
        </li>
        <li id='anchor12'>
          <h3>What is distributed ledger technology?</h3>
          <p>Distributed ledger technology is a broad category that encompasses blockchain technology. A <a href="https://consensys.io/blog" target='__blank'>distributed ledger</a>  is just what its name implies. Instead of accounting for data through one centralized computer, distributed ledger technology uses many participants in a network to maintain a digital record. Blockchain technology supplements a distributed ledger with cryptographic functions and a consensus algorithm to enable greater 
            incentive design, security, accountability, cooperation, and trust.</p>
        </li>
        <li id='anchor13'>
          <h3>What is a blockchain wallet?</h3>
          <p>A blockchain wallet contains the <a href="https://consensys.io/blog" target='__blank'>public key</a> for others to transfer cryptocurrency to your address and the <a href="https://consensys.io/blog" target='__blank'></a>private key so you can securely access your own digital assets. A blockchain wallet usually accompanies node hosting and stores cryptocurrencies on your computer. The safest place for storing digital assets is offline, what is often called “cold storage.” Read <a href="https://consensys.io/blog" target='__blank'></a>“7 Pro Tips for Keeping Your Crypto Safe” for some best practices on protecting your digital assets.</p>
        </li>
        <li id='anchor14'>
          <h3>What is blockchain programming?</h3>
          <p>As a new technology that makes use of global digital networks, the need for blockchain programmers is immense, and in recent years, programmers have flocked to the blockchain space. A key aspect that distinguishes blockchain programming from other Internet ventures is the focus on security and cryptography.
           <a href="https://consensys.io/academy" target='__blank'>Consensys Academy’s Developer Program</a> offers programmers from any background the chance to become a blockchain expert in weeks. Industry experts from around the world teach the course, which focuses on Ethereum blockchain development.</p>
        </li>
        <li id='anchor15'>
          <h3>What is a blockchain company?</h3>
          <p>A blockchain company is simply a company that is invested in and/or developing blockchain technology. 
          <a href="https://www.coingecko.com/en/categories" target='__blank'>State of the Dapps</a> ranks blockchain-based decentralized applications by user activity and Forbes recently released a report covering the <a href="https://consensys.io/blog" target='__blank'>top 50 billion-dollar companies exploring blockchain</a>.</p>
        </li>
        <li id='anchor16'>
          <h3>What is a private blockchain?</h3>
          <p>Blockchains began as open source, public efforts. Private blockchains were developed as corporations and other administrative bodies began to realize the benefits of distributed ledger technology, particularly within systems of a private enterprise and when managing sensitive transaction data. 
            With increasingly robust and modular privacy and permissioning solutions, industry experts anticipate that <a href="https://consensys.io/blog" target='__blank'>private and public blockchain networks will converge.</a></p>
        </li>
        <li id='anchor17'>
          <h3>What are zk-SNARKs?</h3>
          <p>zk-SNARK is an acryonym for zero-knowledge succinct non-interactive argument of knowledge, a cryptographic proof system that enables a user to verify a transaction without revealing the actual data of the transaction, and without interacting with the user who published the transaction. 
            In the context of a blockchain, zk-SNARKs allow users to maintain private transactions, while still validating the transactions according to the network’s consensus algorithm. For a technical walkthrough of zk-SNARKs, check out our <a href="https://consensys.io/blog/introduction-to-zk-snarks" target='__blank'>introduction to zk-SNARKs.</a></p>
        </li>
      </ul>
      <img src={ FaqImg } alt="illustation" />
      <h2>Ethereum Fundamentals</h2>
      <p>Note: “Ethereum” refers to the blockchain. “Ether” or the symbol “ETH” refers to the native token of the Ethereum blockchain.</p>
      <ul className='answers-list'>
        <li id='anchor18'>
          <h3>What is Ethereum?</h3>
          <p>In 2015, the <a href="https://consensys.io/knowledge-base/ethereum" target='__blank'>Ethereum blockchain</a> launched as a much more versatile version of the Bitcoin payment system’s underlying blockchain technology. 
            Ethereum is a decentralized, open source, and distributed computing platform that enables the creation of smart contracts and decentralized applications, 
            also known as dapps. Smart contracts are computer protocols that facilitate, verify, or enforce the negotiation and performance of some sort of agreement. 
            Ethereum brought the first practical solution for smart contracts to the blockchain space.</p>
        </li>
        <li id='anchor19'>
          <h3>How does Ethereum work?</h3>
          <p>Like the Bitcoin blockchain, Ethereum utilizes nodes that are operated voluntarily in order to verify transactions in the network. Nodes can contain the entirety or a segment of Ethereum transaction history, the most recent information about the state of smart contracts, the balances of accounts, and more. 
            At the foundation of Ethereum is the Ethereum Virtual Machine (EVM), which is the executable and trustless environment for smart contracts: computer protocols that facilitate, verify, and enforce the negotiation and performance of some sort of digital agreement. 
            The EVM executes a contract with whatever rules the developer initially programmed, such as sending money from Alice to Bob. The EVM executes these programs through a bytecode language. 
            Ethereum developers are able to use Ethereum programming languages such as Solidity and others to write smart contracts and build decentralized applications.</p>
        </li>
        <li id='anchor20'>
          <h3>What is an Ethereum block?</h3>
          <p>A “block” in the Ethereum blockchain refers to a block of transactions that has been broadcast to the network. The Ethereum mainnet currently uses the Proof of Work consensus algorithm to verify blocks of transactions.</p>
        </li>
        <li id='anchor21'>
          <h3>What is an Ethereum smart contract?</h3>
          <p>Ethereum pioneered  <a href="https://consensys.io/blog" target='__blank'>practical smart contracts </a>for the blockchain ecosystem. A smart contract is essentially a program coded for a specific purpose. Ethereum-based smart contracts have <a href="https://consensys.io/blockchain-use-cases" target='__blank'>numerous applications</a>. 
            In banking and finance, smart contracts can help automate claims processing and enable real-time enforcement of regulatory control limits. 
            In supply chain management, smart contracts are used to enforce asset tracking processes, as well as automate compliance and reporting. 
            Smart contracts have limitless formats in order to support a wide range of industries.</p>
        </li>
        <li id='anchor22'>
          <h3>What is an Ethereum client?</h3>
          <p>
          An Ethereum client is a software application that implements the technical specification defined in the <a href="https://ethereum.github.io/yellowpaper/paper.pdf" target='__blank'>Ethereum Yellow Paper</a> or the <a href="https://entethalliance.org/wp-content/uploads/2019/10/EEA_Enterprise_Ethereum_Client_Specification_V4-1.pdf" target='__blank'>EEA specification</a> (for enterprise applications) and refers to any node that is able to parse and verify the blockchain,
         its smart contracts, or anything related. Open standards and interoperability enable Ethereum clients to communicate over the peer-to-peer network with other Ethereum clients, meaning that they all “speak” the same protocol and follow the same rules. 
         Popular Ethereum clients include Quorum by J.P. Morgan, Parity, Geth, and <a href="https://consensys.io/" target='__blank'>Hyperledger Besu</a>, which was built by the protocol engineering team at <a href="https://consensys.io/" target='__blank'>PegaSys</a>. Hyperledger Besu, which was developed for enterprise use cases, includes a robust set of <a href="https://consensys.io/" target='__blank'>permissioning features</a> and operates 
         across both public and private chains. <a href="https://consensys.io/" target='__blank'>PegaSys Plus</a>, a commercial distribution of Besu, has additional plugin features and support, including encryption at rest, advanced monitoring, and event streaming.
          </p>
        </li>
        <li id='anchor23'>
          <h3>What is Ethereum backed by?</h3>
          <p>Ethereum is an <a href="https://consensys.io/blog" target='__blank'>open source project</a>, which means that anyone can contribute to the codebase and that the network is open to anyone willing to participate. Therefore, Ethereum is owned by no one and everyone. There are many efforts in the Ethereum ecosystem to make open source development economically sustainable for developers. <a href="https://github.com/MolochVentures/Whitepaper/blob/master/Whitepaper.pdf" target='__blank'>MolochDAO</a> is a crowdsourced funding initiative to support Ethereum infrastructure projects. 
            From its bounties explorer to its Patreon-like Grants Program, <a href="https://www.gitcoin.co/" target='__blank'>Gitcoin</a> is also one of the most notable and multi-pronged efforts supporting open source maintainers in the blockchain space.</p>
        </li>
        <li id='anchor24'>
          <h3>What is ether (ETH)?</h3>
          <p>Ether is Ethereum’s native token and the fuel that powers the Ethereum blockchain. On Ethereum, each operation (many of which can be combined to create a single unique smart contract or transaction) requires a certain amount of computing energy to perform. Because miners must use energy to complete these operations, a unit of measurement was created to monitor and compensate miners for the work they spend running transactions and smart contracts. This unit of measurement is called <a href="https://consensys.io/blog" target='__blank'>gas</a>. 
            Gas is a unit of measurement that is unique to the Ethereum blockchain and that measures the computational work required to run transactions or smart contracts within the EVM. The more energy required to run an operation (i.e. a more complex piece of code), 
            the more gas is required. The value of each unit of gas is expressed in ether. Ether therefore provides an incentive for miners to validate blocks of transactions and for developers to write concise, quality code. ETH is the symbol for ether. 
            Note that “eth” is also a command line used for importing the Ethereum wallet.</p>
        </li>
        <li id='anchor25'>
          <h3>What is an ETH address?</h3>
          <p>All cryptocurrencies require addresses, or public identifiers, to send and receive funds. An ETH address is specific to Ethereum’s ether currency. 
            Miners also need to set up an “etherbase,” which is a set address that will collect earnings from mining. <a href="https://consensys.io/blog" target='__blank'>“How to Store Digital Assets on Ethereum”</a> is 
            a helpful walkthrough for understanding cryptocurrency wallets, seed phrases, and security best practices for managing digital assets.</p>
        </li>
        <li id='anchor26'>
          <h3>How can I earn ether (ETH)?</h3>
          <p>There are a variety of ways to earn ETH, both on and off the Ethereum blockchain. ETH is one of the most popularly traded cryptocurrencies and available on most exchanges. 
            ETH is also becoming an increasingly popular way to compensate freelancers. Global freelance marketplaces like <a href="https://bounties.network/" target='__blank'>Bounties Network</a> allow developers, designers, translators, 
            and users from various disciplines to earn ETH for fulfilling tasks. Of course, mining Ethereum and supporting the network is one way to be rewarded in ETH.</p>
        </li>
        <li id='anchor27'>
          <h3>How long does it take to transfer ether?</h3>
          <p>Ethereum confirmation times vary widely depending upon the amount of <a href="https://consensys.io/blog" target='__blank'>gas</a> one is willing to spend, along with other market factors. You can view the median wait times at <a href="https://ethgasstation.info/" target='__blank'>ethgasstation.info</a>.</p>
        </li>
        <li id='anchor28'>
          <h3>What is the gas limit in Ethereum?</h3>
          <p>The Ethereum <a href="https://consensys.io/blog" target='__blank'>gas</a> limit is one of three core concepts of ether. The others are cost and price. Limits are set as the maximum payment one is willing to incur to complete a transaction. If a gas limit is set too low, it is possible that the transaction will fail. 
            This is because the miner who attempts the transaction will go on and execute operations until the gas limit is reached. If additional operations are required, then the miner keeps the gas as fees for work done and the system records the transaction as “failed.” 
            Gas limits are important because they protect both users and miners from faulty codes and network attacks. They are relevant because the dynamic nature of the <a href="https://consensys.io/knowledge-base/ethereum" target='__blank'>Ethereum</a> blockchain is comprised of a variety of smart contract operational levels. 
            Not all transactions are the same and therefore require different amounts of gas to fuel their operations.</p>
        </li>
        <li id='anchor29'>
          <h3>What is Ethereum coded in?</h3>
          <p>Ethereum smart contracts can be coded in Solidity, Serpent, LLL, and Mutan. These are contract-oriented, high-level languages. Their purpose is to target the Ethereum Virtual Machine (EVM) to provide a means for smart contracts. 
            The Ethereum protocol has been developed using a variety of languages, from C++ to Python, Ruby, Go, Java, Rust, and more.</p>
        </li>
        <li id='anchor30'>
          <h3>What is Ethereum used for?</h3>
          <p>There are a wide range of <a href="https://consensys.io/blockchain-use-cases" target='__blank'>Ethereum use cases and applications</a>, from payment settlement to supply chain tracking to digital identity management. Ethereum’s flexibility, modularity, 
            agility, and scalability has attracted thousands of developers to the ecosystem, as well as global enterprises that are interested in deploying blockchain solutions to meet critical business needs.</p>
        </li>
        <li id='anchor31'>
          <h3>What is the Enterprise Ethereum Alliance?</h3>
          <p>The <a href="https://entethalliance.org/" target='__blank'>Enterprise Ethereum Alliance</a> (EEA) was formed in 2017 to accelerate the adoption of Ethereum in enterprise endeavors and to provide global standards for Enterprise Ethereum development. 
            The Alliance uses an open architecture for testing and certification and focuses on providing resources for trust, privacy, and performance to foster a community that supports open source blockchain solutions. 
            The EEA recently released their <a href="https://entethalliance.org/" target='__blank'>Enterprise Ethereum Client Specification V3</a>.</p>
        </li>
      </ul>
      <img src={ FaqImg } alt="illustation" />
      <h2>Bitcoin vs. Ethereum</h2>
      <ul className='answers-list'>
        <li id='anchor32'>
          <h3>What’s the difference between Bitcoin and Ethereum?</h3>
          <p>Many of the underlying principles of Bitcoin and Ethereum are the same. 
            They share many cryptographic functions common to <a href="https://consensys.io/knowledge-base/blockchain" target='__blank'>blockchain technology</a>, and both blockchain networks currently use a Proof of Work consensus algorithm. 
            However, Ethereum was developed to address opportunities that are beyond the scope of the Bitcoin blockchain. The key element that distinguishes Ethereum 
            from Bitcoin is smart contracts––agreements that are embedded in code so that they can automatically execute. Among the other fundamental differences between 
            Bitcoin and Ethereum are their programming languages. Bitcoin uses a stack-based language while Ethereum uses a Turing-complete language. 
            Their block times and hashing algorithms are also different. Ethereum’s core developers believe that moving Ethereum to a Proof of Stake 
            system will make its smart contract-based network more efficient and secure.</p>
        </li>
        <li id='anchor33'>
          <h3>What’s better, Bitcoin or Ethereum?</h3>
          <p>
          Bitcoin and Ethereum both offer unique advantages. 
          Bitcoin was the first blockchain and has therefore seen broad adoption as a fair payment settlement solution. 
          Ethereum was developed to meet the needs that Bitcoin created a demand for after disrupting the way that digital networks are architected and governed. 
          Ethereum’s smart contracts make it much more than a payment solution. It has applications in <a href="https://consensys.io/blockchain-use-cases/supply-chain-management" target='__blank'>supply chain tracking</a>, <a href="https://consensys.io/blockchain-use-cases/energy-and-sustainability" target='__blank'>energy and sustainability</a>, <a href="https://consensys.io/blockchain-use-cases/real-estate" target='__blank'>real estate</a>, <a href="https://consensys.io/blockchain-use-cases/government-and-the-public-sector" target='__blank'>government</a>, 
          and many other sectors. Given the current state of blockchain systems, Ethereum’s architecture most closely resembles what is required of a <a href="https://consensys.io/research/avoiding-blockchain-balkanization" target='__blank'>universal root chain</a> that can provide 
          decentralized and secure base layer settlement for interoperating blockchain networks.
          </p>
        </li>
      </ul>
      <img src={ FaqImg } alt="illustation" />
      <h2>Ethereum Roadmap</h2>
      <ul>
        <li id='anchor34'>
          <h3>What is Byzantium Ethereum?</h3>
          <p>In October 2017, Ethereum initiated a hard fork for its Byzantium update. Byzantium was part of Ethereum’s third-stage release, 
            called Metropolis live. Byzantium brought nine Ethereum Improvement Protocols (EIPs) that improved privacy, scalability, and security 
            throughout the network. The Byzantium upgrade was followed by the <a href="https://consensys.io/blog" target='__blank'>Constantinople hard fork</a> in February 2019, which integrated five EIPs 
            and reduced the block reward from 3 to 2 ETH.</p>
        </li>
        <li id='anchor35'>
          <h3>What is Proof of Stake (PoS) Ethereum?</h3>
          <p>The Ethereum blockchain currently uses a Proof of Work (PoW) consensus algorithm, similar to the Bitcoin blockchain. 
            Because of scalability and other issues, Ethereum now has plans to move to a Proof of Stake (PoS) system. PoS will 
            solve issues related to mining, excessive energy consumption, access to mining hardware, and centralized mining pools. 
            Vlad Zamfir, a lead developer of Casper (the original name for the PoS system) has pointed out that the 51% attack that 
            blockchains developers fear would cost much more in failed attempts because attackers must risk their own stakes.</p>
        </li>
        <li id='anchor36'>
          <h3>What’s next for Ethereum?</h3>
          <p>Serenity––also known as Ethereum 2.0––is the eventual and final iteration in Ethereum’s evolution. It will take place in multiple stages. Following Istanbul, the last planned hard fork for Ethereum, the Beacon Chain is expected to roll out in 2019 as the first phrase of Serenity. 
            The Beacon Chain is a Proof of Stake blockchain that will be stood up alongside Ethereum’s original PoW chain to ensure the continuity of the chains. For a deeper dive into the upcoming stages of Ethereum’s evolution, read <a href="https://consensys.io/blog" target='__blank'>“The Roadmap to Serenity.”</a></p>
        </li>
      </ul>
      <img src={ FaqImg } alt="illustation" />
      <h2>Ethereum Mining</h2>
      <ul className='answers-list'>
        <li id='anchor37'>
          <h3>What is Ethereum mining?</h3>
          <p>On the Ethereum blockchain, miners currently use a Proof of Work (PoW) algorithm to settle transactions. They are rewarded financially for their efforts. There are <a href="https://consensys.io/blog" target='__blank'>ongoing plans</a> to make Ethereum a Proof of Stake (PoS) system. 
            Proof of Stake dictates that two-thirds of validators must stake ETH on the next block, meaning the financial incentive is much riskier for potential malicious actors.</p>
        </li>
        <li id='anchor38'>
          <h3>How long does it take to mine Ethereum?</h3>
          <p><a href="https://consensys.io/blog" target='__blank'>Ethereum</a> is mined in blocks. According to <a href="https://ethstats.io/" target='__blank'>ethstats.io</a>, the average Ethereum block time as of July 2019 is approximately 13 seconds.</p>
        </li>
        <li id='anchor39'>
          <h3>What is the hashrate of Ethereum?</h3>
          <p>Hashrate refers to the speed at which an Ethereum miner operates, specifically the number of hashes guessed per second for solving the nonce of a block of transactions. 
            According to <a href="https://ethstats.io/" target='__blank'>ethstats.io</a>, the average Ethereum network hashrate as of July 2019 is 166.46 TH/s.</p>
        </li>
        <li id='anchor40'>
          <h3>Can I mine Ethereum?</h3>
          <p>Mining Ethereum becomes increasingly difficult over time. Most miners use a mining pool, which allows participants to <a href="https://consensys.io/blog" target='__blank'>pool their hashing power</a>. Currently, solo mining is very difficult––it 
            can take years to find a single block. Mining pools however have proven to deliver consistent profits to participants.</p>
        </li>
        <li id='anchor41'>
          <h3>Can my computer mine Ethereum?</h3>
          <p>Your computer’s ability to mine Ethereum depends upon your GPU power. 
            While dedicated mining hardware is often recommended, some powerful computers can contribute to a mining pool.</p>
        </li>
        <li id='anchor42'>
          <h3>What is Ethereum difficulty?</h3>
          <p>Ethereum <a href="https://consensys.io/blog" target='__blank'>difficulty</a> refers to miners’ hashing function and the difficulty of finding a new block. At higher difficulties, it is harder for miners to find valid blocks. 
            According to <a href="https://ethstats.io/" target='__blank'>ethstats.io</a>, the average difficulty of the Ethereum network as of July 2019 is 2.2075 PH.</p>
        </li>
        <li id='anchor43'>
          <h3>What do you need to mine Ethereum?</h3>
          <p>While there are cloud mining applications that offer people the opportunity to share in the profits of mining Ethereum, it is not a pure form of mining. This is more of an investment or rental option. Mining ETH alone is currently impractical, 
            so most miners participate in <a href="https://consensys.io/blog" target='__blank'>mining pools</a>, which generally proves more profitable. Dedicated mining hardware is advised even to mine as part of a pool.</p>
        </li>
        <li id='anchor44'>
          <h3>Can you mine Ethereum on a laptop?</h3>
          <p>Yes, it is possible to mine Ethereum using a laptop. You will need to install specific software for your OS. However, mining Ethereum on a personal computer is currently impractical. Many products are available with dedicated hardware specifically for mining. 
            They are made to operate efficiently so that miners can maximize their profits.</p>
        </li>
        <li id='anchor45'>
          <h3>Can you mine Ethereum on a Mac?</h3>
          <p>Mining Ethereum on a Mac is possible. However, most miners use dedicated hardware.</p>
        </li>
        <li id='anchor46'>
          <h3>How much Ethereum can I mine in a day?</h3>
          <p>The reward for mining Ethereum depends on several factors: your equipment, whether you participate in a mining pool, 
            and the state of the blockchain. According to Alethio’s 2018 <a href="https://consensys.io/blog" target='__blank'>research report on mining pools</a>, miners in the top four mining pools 
            received approximately 0.04% payout. This payout is more lucrative than it seems considering that the top five pools were found to 
            mine 84% of all newly found blocks. For example, Ethermine, the top mining pool for the week measured, found 11,235 blocks.Note: 
            The questions above are based on Google search volume in the USA.</p>
        </li>
      </ul>
      <img src={ FaqImg } alt="illustation" />
    </div>
  )
}

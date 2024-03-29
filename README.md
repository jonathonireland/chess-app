<h1>React Chess App</h1>

<p>To find my chess app click here: <a href="https://jonathonireland.com/chess-app">https://jonathonireland.com/chess-app</a></p>

<p>I followed this <a href="https://www.youtube.com/playlist?list=PLBmRxydnERkysOgOS917Ojc_-uisgb8Aj">Youtube series</a> from <a href="https://www.youtube.com/@FrontendCoding">@FrontendCoding</a> to build a React.Js Chess app. Once I was done following a video (and the code I derived from the video worked well enough to compile and function) I pushed up my progress pertaining to that video in a commit. I also privided the date I pushed that change in the table below and where possible if I created a branch for that tutorial I listed the name of that branch here too. Now that I have concluded the tutorials, I am listing out bugs as I find them. When I finish fixing these bugs, I will start further development objectives as time allows this is a lower priority project than others I have.</p>
<img src="https://www.jonathonireland.com/resume/data/files/Screenshot 2024-02-13 at 12.58.46 AM.png" alt="React Chess Board Image" />
<table>
<tr><th>Bugs List</th><th>Development Objectives</th></tr>
<tr>
<td>
<ol>
<li>Once the king is in check other pieces cannot rescue the king.</li>
<li>FIXED! Castling should only be possible (and pieces circled when possible moves are implied) when the spaces between the king and rook are vacant.</li>
<li>FIXED! Once castling has happened, the king's possible moves shouldnt include moving on top of the rook.</li>
</ol>
</td>
<td>
<ol>
<li>Add Captured Pieces to screen</li>
<li>Add a scrolling list of moves made to the screen.</li>
<li>Add a persistant data storage for games played and movs made.</li>
</ol>
</td>
</tr>
</table>

<h2>Chess App Project Branches and Timeline</h2>
<table>
<tr><th>Youtube Link</th><th>Date</th><th>Repository Branch <br/>(if available)</th></tr>
<tr>
    <td><a href="https://youtu.be/Iri__zwxwHg?si=iDO4l2P3dyeASPoO">Part 1: The board!</a></td>
    <td>1/23/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://www.youtube.com/watch?v=HKMcqyfRQoE">Part 2: The pieces!</a></td>
    <td>1/24/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/coi5AoV53Es?si=xalgib4_6fwhzEtn">Part 3: Moving pieces</a></td>
    <td>1/24/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/zgZOm4iD32U?si=hLXA5R7y3hYEIWML">Part 4: Finishing Movement Control</a></td>
    <td>1/25/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/JzCKJOCR3PI?si=QsSlF4lJGEW89wsv">Part 5: Grid Snapping</a</td>
    <td>1/25/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/sjgJ-srZrsU?si=M8TxOPPjRWmq0B5I">Part 6: The referee</a</td>
    <td>1/25/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/sX0HM52iH8o?si=8Qe8sjr0VqpXqPsH">Part 7: Basic Pawn Rules</a></td>
    <td>1/26/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/KDGYZRe8cYI?si=jMadpuc99GWUnLDp">Part 8: Attacking Pawn</a></td>
    <td>1/26/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/K92YUaS858M?si=F4EbZlslY9p42l5s">Part 9: En passant</a></td>
    <td>1/29/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/a1Fr-EnrAS8?si=_4Gbd81RBN6tZfuH">Part 10: Refactoring</a></td>
    <td>2/9/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/d8mrqf71exU?si=rDnyzxgkvty2fv-i">Part 11: Knight Moves</a></td>
    <td>2/10/2024</td>
    <td>Part-11-Knight-Movement</td>
</tr>
</table>
<h3>Knight Moves (Previewed)</h3>
<p>Below the black knight's moves are previewed when it's selected by the black player.</p>
<img src="https://www.jonathonireland.com/resume/data/files/ReactKnightMoves.png" alt="React Chess App Knight Moves Preview" />
<table>
<tr><th>Youtube Link</th><th>Date</th><th>Repository Branch <br/>(if available)</th></tr>
<tr>
    <td><a href="https://youtu.be/ndek8MlGnYw?si=2Rnm-ifIgyPalsl1">Part 12: Bishop Logic</a></td>
    <td>2/10/2024</td>
    <td>Part-12-Bishop-Movement</td>
</tr>
<tr>
    <td><a href="https://youtu.be/8vmukUQze6Q?si=zaWWr0gPo6OyCwOy">Part 13: Bishop Moves</a></td>
    <td>2/11/2024</td>
    <td></td>
</tr>
<tr>
    <td><a href="https://youtu.be/NjHvS-RzVBk?si=Puo0ee0smvwUveqt">Part 14: Bishop Attack</a></td>
    <td>2/11/2024</td>
    <td>Part-14-Bishop-attack</td>
</tr>
<tr>
    <td><a href="https://youtu.be/BsAN5n7iIbQ?si=WydnvQtIw1GSYW2A">Part 15: Rook Logic</a></td>
    <td>2/13/2024</td>
    <td>Part-15-Bishop-Logic</td>
</tr>
<tr>
    <td><a href="https://youtu.be/ccyK-z_c2z4?si=_fikwqgllRobaNQH">Part 16: Rook Movement & Attack (and refactor)</a></td>
    <td>2/13/2024</td>
    <td>Part-16-Rook-Movement-and-attack</td>
</tr>
<tr>
    <td><a href="https://youtu.be/K8xYjdvZHmo?si=mjjnoDfmfiNgZaBS">Part 17: Queen Setup (and some extra work)</a></td>
    <td>2/13/2024</td>
    <td>Part-17-Queen-Setup</td>
</tr>
<tr>
    <td><a href="https://youtu.be/D2Rxmfs916I?si=wuz_dUSInLgrOi8j">Part 18: Queen Finished</a></td>
    <td>2/13/2024</td>
    <td>Part-18-Queen-Finished</td>
</tr>
</table>
<h3>Queen Moves (Previewed)</h3>
<p>Below the white queen's moves are previewed when it's selected by the white player.</p>
<img src="https://www.jonathonireland.com/resume/data/files/ReacttQueenMoves.png" alt="React Chess App Queen Moves Preview" />
<table>
<tr><th>Youtube Link</th><th>Date</th><th>Repository Branch <br/>(if available)</th></tr>
<tr>
    <td><a href="https://youtu.be/CmoPebnJktU?si=vx_hLpfp-Rq-mkhf">Part 19: The King</a></td>
    <td>2/14/2024</td>
    <td>Part-19-The-King</td>
</tr>
<tr>
    <td><a href="https://youtu.be/qBWKG0mdsAg?si=HrMlnWTNUE5lLIJ7">Part 20: Refactoring Referee</a></td>
    <td>2/14/2024</td>
    <td>Part-20-Refactoring-Referee</td>
</tr>
<tr>
    <td><a href="https://youtu.be/xEA_2lSV-ow?si=5pKd_rHmWXAugBuE">Part 21: Pawn Promotion</a></td>
    <td>2/14/2024</td>
    <td>Part-21-Pawn-Promotion</td>
</tr>
</table>
<h3>Pawn Promotion Example</h3>
<p>Below is an image of the pawn promotion modal when activated because a pawn has made it's way accross the board.</p>
<img src="https://www.jonathonireland.com/resume/data/files/ReactPawnPromotion.png"  alt="React Chess App Pawn Promotion example."/>
<table>
<tr><th>Youtube Link</th><th>Date</th><th>Repository Branch <br/>(if available)</th></tr>
<tr>
    <td><a href="https://youtu.be/27dtFOb61tM?si=uPB4WDQlzzsLL0SO">Part 22: Preview Moves</a></td>
    <td>2/15/2024</td>
    <td>Part-22-Preview-Moves</td>
</tr>
<tr>
    <td><a href="https://youtu.be/EgutGRqw_oI?si=YMAIsr-m12mcALCS">Part 23: Preview Done</a></td>
    <td>2/15/2024</td>
    <td></td>
</tr>
</table>
<h3>Pawn Moves (Previewed)</h3>
<p>Below is an image of the moves with circles around the pices that the white pawn can attack.</p>
<img src="https://www.jonathonireland.com/resume/data/files/ReactPawnAttackingMoves.png" alt="React Chess App Pawn Preview Attacking Moves" />
<table>
<tr><th>Youtube Link</th><th>Date</th><th>Repository Branch <br/>(if available)</th></tr>
<tr>
    <td><a href="https://youtu.be/PsKw6u5SAA8?si=RbQXrXmY0ZKTfCkh">Part 24: Referee Component</a></td>
    <td>2/18/2024</td>
    <td>Part-24-Referee-Component-Attempt-2</td>
</tr>
<tr>
    <td><a href="https://youtu.be/faMfrApfV7o?si=mbZkMwjC8R0ckXxd">Part 25: Object-Oriented</a></td>
    <td>2/20/2024</td>
    <td>Part-25-Object-Oriented-Attempt-2</td>
</tr>
<tr>
    <td><a href="https://youtu.be/ZMLywTMmSq0?si=RIUyCi_ewEIdnOZP">Part 26: Class Inheritance</a></td>
    <td>2/21/2024</td>
    <td>Part-26-Class-Inheritance</td>
</tr>
<tr>
    <td><a href="https://youtu.be/N2EU7vtwsWE?si=jhdExv5OE0zmALQ6">Part 27: Cloning</a></td>
    <td>2/21/2024</td>
    <td>Part-27-Cloning</td>
</tr>
<tr>
    <td><a href="https://youtu.be/U_0JmKTWf48?si=uPhjMrEZyD97m0Du">Part 28: King Danger</a></td>
    <td>2/22/2024</td>
    <td>Part-28-king-danger</td>
</tr>
<tr>
    <td><a href="https://youtu.be/p9FMvX6fGAU?si=cynJJjUGTdjZlujA">Part 29: King Protection</a></td>
    <td>2/23/2024</td>
    <td>Part-29-king-protection</td>
</tr>
<tr>
    <td><a href="https://youtu.be/wNyPCPBBfRo?si=qbLj4SztjLy0Y7wx">Part 30: Castling Logic</a></td>
    <td>2/23/2024</td>
    <td>Part-30-Castling-Logic</td>
</tr>
<tr>
    <td><a href="https://youtu.be/veo12qNIJ7o?si=hx6Oprodv_8Kj50Q">Part 31: Checkmate</a></td>
    <td>2/24/2024</td>
    <td>Part-31-Checkmate</td>
</tr>
</table>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

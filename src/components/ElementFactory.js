
// make this a closure function. There is a lot of potential for this to be a really 

export default function elementFactory(x1, y1, x2, y2, mode, generator, theme, type,) {



  function createElement(x1, y1, x2, y2) {


    let roughElement;

    switch (mode) {
      case "line":
        //  roughElement = generator.line(x1, y1, x2, y2);
        //white line
        roughElement = generator.line(x1, y1, x2, y2);
        break;
      case "rectangle":
        roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
        break;
      case "ellipse":
        roughElement = generator.ellipse(x1, y1, x2 - x1, y2 - y1);
        break;

      case 'diamond':
        console.log('switch diamond')
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2],
          [x1, y1 + (y2 - y1)],
          [x1 - (x2 - x1) / 2, y1 + (y2 - y1) / 2]
        ]);

        break;


      case 'triangle':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1 - (x2 - x1), y1 + (y2 - y1)]
        ]);
        break;

      case 'pentagon':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1) * 1.5, y1 + (y2 - y1)],
          [x1 - (x2 - x1) * 0.5, y1 + (y2 - y1)],
          [x1 - (x2 - x1), y1]
        ]);
        break;

      case 'hexagon':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1) * 1.5, y1 + (y2 - y1) / 2],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1)],
          [x1 - (x2 - x1) * 0.5, y1 + (y2 - y1) / 2]
        ]);
        break;

      case 'octagon':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1), y1 + (y2 - y1) / 2],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1) / 2]
        ]);
        break;

      case 'database':
        roughElement = generator.polygon([
          [x1, y1],
          [x1 + (x2 - x1) / 2, y1],
          [x1 + (x2 - x1), y1],
          [x1 + (x2 - x1) * 0.75, y1 + (y2 - y1) / 2],
          [x1 + (x2 - x1), y1 + (y2 - y1)],
          [x1 + (x2 - x1) / 2, y1 + (y2 - y1)],
          [x1, y1 + (y2 - y1)],
          [x1 + (x2 - x1) * 0.25, y1 + (y2 - y1) / 2]
        ]);
        break;

      case "X":
        roughElement = generator.path("M " +
          x1 + " " + y1 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x2 + " " + y2 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x1 + " " + y2 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x2 + " " + y1 + " L " + (x1 + (x2 - x1) / 2) + " " + (y1 + (y2 - y1) / 2) + " L " + x1 + " " + y1);
        break



      default:
        roughElement = generator.line(x1, y1, x2, y2);
        break;

    };



    return { x1, y1, x2, y2, roughElement }

  }

  return createElement(x1, y1, x2, y2);


}





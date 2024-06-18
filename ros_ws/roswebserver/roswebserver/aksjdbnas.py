#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Int32, Bool
import time
import flask
import threading

class WebServer(Node):
  def __init__(self) -> None:
    super().__init__('web_server')

    # Initialize variables
    self.delivery_trigger = Bool()

    # Publisher
    self.delivery_trigger_publisher = self.create_publisher(Bool, '/delivery/trigger', 10)

    # Flask app thread
    self.thread = threading.Thread(target=self.create_app)
    self.thread.start()

  def create_app(self):
    app = flask.Flask(__name__)
    
    # Print app object for debugging
    print(app)

    # Change port
    #app.config['SERVER_NAME'] = 'localhost:8082'

    @app.route('/', methods=['GET'])
    def debug():
        return 'Hello, World!'
  
    @app.route('/delivery', methods=['POST'])
    def index():
        #self.delivery_trigger.data = True
        #self.delivery_trigger_publisher.publish(self.delivery_trigger)
        print('Delivery triggered')
        #return 'Hello, World!'

    print(app)
    app.run(host='localhost', port=8082)

def main(args=None) -> None:
    print('Starting webserver node...')
    rclpy.init(args=args)
    web_server = WebServer()
    rclpy.spin(web_server)
    web_server.thread.join()
    web_server.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(e)

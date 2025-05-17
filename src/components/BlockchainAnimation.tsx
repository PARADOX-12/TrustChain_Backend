
import React, { useEffect, useRef } from 'react';

const BlockchainAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes: Node[] = [];
    const connections: Connection[] = [];
    let animationFrameId: number;
    
    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    // Initialize on load and resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Node class
    class Node {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: {x: number, y: number};

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 2;
        this.color = Math.random() > 0.5 ? '#1E2A38' : '#2ECC71';
        this.speed = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        };
      }

      update() {
        this.x += this.speed.x;
        this.y += this.speed.y;

        // Bounce off edges
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
          this.speed.x = -this.speed.x;
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
          this.speed.y = -this.speed.y;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Connection class
    class Connection {
      from: Node;
      to: Node;
      distance: number;
      opacity: number;

      constructor(from: Node, to: Node) {
        this.from = from;
        this.to = to;
        this.distance = Math.hypot(from.x - to.x, from.y - to.y);
        this.opacity = 0;
      }

      update() {
        const currentDistance = Math.hypot(this.from.x - this.to.x, this.from.y - this.to.y);
        // Update connection distance
        this.distance = currentDistance;
        
        // Only show connections within a certain range
        const maxDistance = 150;
        this.opacity = this.distance < maxDistance ? 1 - this.distance/maxDistance : 0;
      }

      draw() {
        if (!ctx || this.opacity <= 0) return;
        
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);
        ctx.strokeStyle = `rgba(30, 42, 56, ${this.opacity * 0.3})`;
        ctx.lineWidth = this.opacity * 0.8;
        ctx.stroke();
      }
    }

    // Create initial nodes
    const initNodes = () => {
      const nodeCount = Math.floor(canvas.width * canvas.height / 15000);
      
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodes.push(new Node(x, y));
      }

      // Create connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          connections.push(new Connection(nodes[i], nodes[j]));
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Update and draw connections
      connections.forEach(connection => {
        connection.update();
        connection.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    initNodes();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-50"
    />
  );
};

export default BlockchainAnimation;

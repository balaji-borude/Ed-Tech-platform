// ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2> Something went wrong loading the video.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
